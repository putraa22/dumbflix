package authdto

import "dumbflix/models"

type LoginResponse struct {
	// ID       int    `gorm:"type: int" json:"id"`
	// FullName string `gorm:"type: varchar(225)" json:"fullname"`
	Email string `gorm:"type: varchar(225)" json:"email"`
	// Status   string `gorm:"type: varchar(50)"  json:"status"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(225)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type CheckAuthResponse struct {
	// Id       int    `gorm:"type: int" json:"id"`
	// FullName string `gorm:"type: varchar(255)" json:"Fullname"`
	// Email    string `gorm:"type: varchar(255)" json:"email"`
	User   models.User `json:"user"`
	Status string      `json:"status"`
}
