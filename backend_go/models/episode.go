package models

import "time"

type Episode struct {
	ID            int                  `json:"id"`
	Title         string               `json:"title" gorm:"type: varchar(225)"`
	ThumbnailFilm string               `json:"thumbnailFilm" gorm:"type: varchar(50)"`
	LinkFilm      string               `json:"linkFilm" gorm:"type: varchar(50)"`
	FilmID        int                  `json:"film_id" form:"film_id"`
	Film          FilmCategoryResponse `json:"film"`
	CreatedAt     time.Time            `json:"-"`
	UpdatedAt     time.Time            `json:"-"`
}

type EpisodeResponse struct {
	ID            int                  `json:"id"`
	Title         string               `json:"title"`
	ThumbnailFilm string               `json:"thumbnailFilm" `
	LinkFilm      string               `json:"linkFilm"`
	FilmID        int                  `json:"film_id"`
	Film          FilmCategoryResponse `json:"film"`
}

func (EpisodeResponse) TableName() string {
	return "episode"
}
