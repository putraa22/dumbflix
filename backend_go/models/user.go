package models

import "time"

type User struct {
	ID        int       `json:"id"`
	FullName  string    `json:"fullname" gorm:"type: varchar(255)"`
	Email     string    `json:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"password" gorm:"type: varchar(255)"`
	Gender    string    `json:"gender" gorm:"type:varchar(50)"`
	Phone     string    `json:"phone" gorm:"type: varchar(50)"`
	Address   string    `json:"address" gorm:"type:varchar(225)"`
	Status    bool      `json:"status" gorm:"type:varchar(50)"`
	Role      string    `json:"role" gorm:"type: varchar(50)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
