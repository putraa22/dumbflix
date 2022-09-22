package models

import "time"

type Transaction struct {
	ID        int          `json:"id" gorm:"primary_key:auto_increment"`
	StartDate time.Time    `json:"startDate"`
	DueDate   time.Time    `json:"dueDate"`
	UserID    int          `json:"user_id"`
	User      UserResponse `json:"user"`
	Price     int          `json:"price"`
	Status    string       `json:"status"`
}

type TransactionResponse struct {
	ID        int          `json:"id"`
	StartDate time.Time    `json:"startDate"`
	DueDate   time.Time    `json:"dueDate"`
	User      UserResponse `json:"user"`
	UserID    int          `json:"user_id"`
	Price     int          `json:"price"`
	Status    string       `json:"status"`
}

type UserResponse struct {
	ID        int    `json:"id"`
	FullName  string `json:"fullname" form:"fullname" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
	Gender    string `json:"gender" form:"gender" validate:"required"`
	Phone     string    `json:"phone" gorm:"type: varchar(50)"`
	Address   string    `json:"address" gorm:"type:varchar(225)"`
	Status    bool      `json:"status" gorm:"type:varchar(50)"`
	
}

func (UserResponse) TableName() string {
	return "users"
}
