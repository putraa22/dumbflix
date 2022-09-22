package models

type Film struct {
	ID          int              `json:"id" gorm:"primary_key:auto_increment" `
	Title       string           `json:"title" gorm:"type:varchar(225)"`
	ThumbNail   string           `json:"thumbnail" gorm:"type:varchar(225)"`
	LinkFilm    string           `json:"linkFilm" gorm:"type:text" form:"linkFilm"`
	Year        string           `json:"year"  gorm:"type: varchar(50)"`
	CategoryID  int              `json:"category_id" form:"category_id"`
	Category    CategoryResponse `json:"category"`
	Description string           `json:"description" gorm:"type:varchar(225)"`
}

type FilmResponse struct {
	ID          int              `json:"id"`
	Title       string           `json:"title"`
	ThumbNail   string           `json:"thumbnail"`
	LinkFilm    string           `json:"linkFilm"`
	Year        string           `json:"year"`
	CategoryID  int              `json:"category_id"`
	Category    CategoryResponse `json:"category"`
	Description string           `json:"description"`
}

type FilmCategoryResponse struct {
	ID          int              `json:"id"`
	Title       string           `json:"title"`
	ThumbNail   string           `json:"thumbnail"`
	LinkFilm    string           `json:"linkFilm"`
	Year        string           `json:"year"`
	CategoryID  int              `json:"category_id"`
	Category    CategoryResponse `json:"category"`
	Description string           `json:"description"`
}

func (CategoryResponse) TableName() string {
	return "categories"
}

func (FilmCategoryResponse) TableName() string {
	return "films"
}

func (FilmResponse) TableName() string {
	return "films"
}
