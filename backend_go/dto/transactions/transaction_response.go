package transactionsdto

import "time"

type TransactionResponse struct {
	ID        int       `json:"id"`
	StartDate time.Time `json:"startDate"`
	DueDate   time.Time `json:"dueDate"`
	UserID    int       `json:"user_id" form:"user_id"`
	Price     int       `json:"price"`
	Status    string    `json:"status"`
}
