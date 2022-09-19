package usersdto

type CreateUserRequest struct {
	FullName string `json:"fullname" form:"fullname" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Phone    string `json:"phone" gorm:"type:varchar(50)"`
	Address  string `json:"address" form:"address"`
	Status   bool   `json:"status" form:"subscribe"`
	Role     string `json:"role" form:"role"`
}

type UpdateUserRequest struct {
	FullName string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"  validate:"required"`
	Password string `json:"password" form:"password"`
	Gender   string `json:"gender" form:"gender"`
	Phone    string `json:"phone" gorm:"type:varchar(50)"`
	Address  string `json:"address" form:"address"`
	Status   bool   `json:"status" form:"subscribe"`
	Role     string `json:"role" form:"role"`
}
