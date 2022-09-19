package episodedto

type EpisodeRequest struct {
	Title         string `json:"title" form:"title" gorm:"type: varchar(225)" validate:"required"`
	ThumbnailFilm string `json:"thumbnailFilm" form:"thumbnailFilm" gorm:"type: varchar(225)"`
	LinkFilm      string `json:"linkFilm" form:"linkFilm" gorm:"type: varchar(225)"`
	FilmID        int    `json:"film_id" gorm:"type: int"`
}

type CreateEpisodeRequest struct {
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnailFilm" form:"thumbnailFilm"`
	LinkFilm      string `json:"linkFilm" form:"linkFilm"`
	FilmID        int    `json:"film_id"`
}

type UpdateEpisodeRequest struct {
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnailFilm" form:"thumbnailFilm"`
	LinkFilm      string `json:"linkFilm" form:"linkFilm"`
	FilmID        int    `json:"film_id"`
}
