package transactionsdto

type TransactionRequest struct {
	StartDate string `json:"startDate"`
	DueDate   string `json:"dueDate"`
	UserID    int    `json:"user_id" form:"user_id"`
	Attache   string `json:"attache" gorm:"type:varchar(50)" validate:"required"`
	Status    string `json:"status"`
}

type CreatTransactoinRequest struct {
	StartDate string `json:"startDate"`
	DueDate   string `json:"dueDate"`
	UserID    int    `json:"user_id" form:"user_id"`
	Attache   string `json:"attache" gorm:"type:varchar(50)" validate:"required"`
	Status    string `json:"status"`
}

type UpdateTransactionRequest struct {
	StartDate string `json:"startDate"`
	DueDate   string `json:"dueDate"`
	UserID    int    `json:"user_id" form:"user_id"`
	Attache   string `json:"attache" gorm:"type:varchar(50)" validate:"required"`
	Status    string `json:"status"`
}
