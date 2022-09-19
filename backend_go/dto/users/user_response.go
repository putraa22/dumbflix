package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullname" form:"fullname" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Phone    string `json:"phone" form:"phone"`
	Address  string `json:"address" form:"address"`
	Status   bool   `json:"status" form:"subscribe"`
	Role     string `json:"role" form:"role"`
}
