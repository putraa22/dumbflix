package transactionsdto

import "time"

type TransactionRequest struct {
	StartDate time.Time `json:"startDate"`
	DueDate   time.Time `json:"dueDate"`
	UserID    int       `json:"user_id" form:"user_id"`
	Price     int       `json:"price"`
}

type CreatTransactoinRequest struct {
	StartDate time.Time `json:"startDate"`
	DueDate   time.Time `json:"dueDate"`
	UserID    int       `json:"user_id" form:"user_id"`
	Price     int       `json:"price"`
	Status    string    `json:"status"`
}

type UpdateTransactionRequest struct {
	StartDate time.Time `json:"startDate"`
	DueDate   time.Time `json:"dueDate"`
	UserID    int       `json:"user_id" form:"user_id"`
	Price     int       `json:"price"`
	Status    string    `json:"status"`
}
