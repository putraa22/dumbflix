package handlers

import (
	dto "dumbflix/dto/result"
	transactionsdto "dumbflix/dto/transactions"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"gopkg.in/gomail.v2"

	"math/rand"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
)

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey: os.Getenv("CLIENT_KEY"),
}

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transactions}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) GetTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var transaction models.Transaction
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transaction}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get data user token
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// convert start date & end date
	currentTime := time.Now()
	dueDate := time.Now().Add(time.Hour * 24 * 30)

	user_id, _ := strconv.Atoi(r.FormValue("user_id"))
	request := transactionsdto.TransactionRequest{
		StartDate: currentTime,
		DueDate: dueDate,
		UserID: user_id,
	}

	var TransIdIsMatch = false
	var TransactionId int
	for !TransIdIsMatch {
		TransactionId = userId + rand.Intn(10000) - rand.Intn(100)
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {
			TransIdIsMatch = true
		}
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	transaction := models.Transaction{
		StartDate: currentTime,
		DueDate:   dueDate,
		UserID:    userId,
		Price:     50000,
		Status:    "Pending",
	}
	
	transactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	transaction, err = h.TransactionRepository.GetTransaction(transactions.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transaction.ID),
			GrossAmt: int64(transaction.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transaction.User.FullName,
			Email: transaction.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(w).Encode(response)

	// w.WriteHeader(http.StatusOK)
	// response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	// json.NewEncoder(w).Encode(response)

}

func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	transaction, _ := h.TransactionRepository.GetOneTransaction(orderId)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", orderId)
		} else if fraudStatus == "accept" {
			sendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", orderId)
		}
	} else if transactionStatus == "settlement" {
		sendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", orderId)
	} else if transactionStatus == "deny" {
		sendMail("failed", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "cancel" || transactionStatus == "expired" {
		sendMail("failed", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", orderId)
	}

	w.WriteHeader(http.StatusOK)
}

func sendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
	  var CONFIG_SMTP_PORT = 587
	  var CONFIG_SENDER_NAME = "hermansyahputra0418@gmail.com"
	  var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
	  var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")
  
	  var expire = transaction.DueDate
	  var price = strconv.Itoa(transaction.Price)


	  mailer := gomail.NewMessage()
	  mailer.SetHeader("From", CONFIG_SENDER_NAME)
	  mailer.SetHeader("To", transaction.User.Email)
	  mailer.SetHeader("Subject", "Transaction Status")
	  mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Expired in : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, expire, price, status))

	  dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	  )

	  err := dialer.DialAndSend(mailer)
	  if err != nil {
		log.Fatal(err.Error())
	  }
	  log.Println("Mail sent! to " + transaction.User.Email)
	}
}

func (h *handlerTransaction) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	json.NewEncoder(w).Encode(response)

}

func convertResponseTransaction(t models.Transaction) transactionsdto.TransactionResponse {
	return transactionsdto.TransactionResponse{
		ID:        t.ID,
		StartDate: t.StartDate,
		DueDate:   t.DueDate,
		UserID:    t.UserID,
		Price:     t.Price,
		Status:    t.Status,
	}
}
