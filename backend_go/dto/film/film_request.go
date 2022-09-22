package filmsdto

type FilmRequest struct {
	Title       string `json:"title" form:"title" gorm:"type:varchar(225)" validate:"required"`
	ThumbNail   string `json:"thumbnail" form:"thumbnail" gorm:"type:varchar(225)" validate:"required"`
	LinkFilm    string `json:"linkFilm" form:"linkFilm" gorm:"type: varchar(255)" `
	Year        string `json:"year" form:"year" gorm:"type: varchar(50)"`
	CategoryID  int    `json:"category_id" form:"category_id" gorm:"type: int"`
	Description string `json:"description" form:"description" gorm:"type:varchar(225)" validate:"required"`
}

type CreateFilmRequest struct {
	Title       string `json:"title" form:"title" validate:"required"`
	ThumbNail   string `json:"thumbnail" form:"thumbnail" validate:"required"`
	LinkFilm    string `json:"linkFilm" form:"linkFilm" gorm:"type: varchar(255)" `
	Year        string `json:"year" form:"year"`
	CategoryID  int    `json:"category_id" form:"category_id"`
	Description string `json:"description" form:"description"`
}

type UpdateFilmRequest struct {
	Title       string `json:"title" form:"title" validate:"required"`
	ThumbNail   string `json:"thumbnail" form:"thumbnail" validate:"required"`
	LinkFilm    string `json:"linkFilm" form:"linkFilm" gorm:"type: varchar(255)" `
	Year        string `json:"year" form:"year"`
	CategoryID  int    `json:"category_id"`
	Description string `json:"description" form:"description"`
}
