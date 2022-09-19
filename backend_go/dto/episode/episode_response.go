package episodedto

type EpisodeResponse struct {
	ID            int    `json:"id"`
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnailFilm" form:"thumbnailFilm"`
	LinkFilm      string `json:"linkFilm" form:"linkFilm"`
	FilmID        int    `json:"film_id" gorm:"type: int"`
}
