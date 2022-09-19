package transactionsdto

type TransactionResponse struct {
	ID        int    `json:"id"`
	StartDate string `json:"startDate"`
	DueDate   string `json:"dueDate"`
	UserID    int    `json:"user_id" form:"user_id"`
	Attache   string `json:"attache"`
	Status    string `json:"status"`
}
