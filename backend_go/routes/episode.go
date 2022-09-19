package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func EpisodeRoutes(r *mux.Router) {
	episodeRepository := repositories.RepositoryEpisode(mysql.DB)
	h := handlers.HandlerEpisode(episodeRepository)

	r.HandleFunc("/episodes", middleware.Auth(h.FindEpisode)).Methods("GET")
	r.HandleFunc("/episode/{id}", middleware.Auth(h.GetEpisode)).Methods("GET")
	r.HandleFunc("/episode", middleware.Auth(h.CreateEpisode)).Methods("POST")
	r.HandleFunc("/episode/{id}", middleware.Auth(h.UpdateEpisode)).Methods("PATCH")
	r.HandleFunc("/episode/{id}", middleware.Auth(h.DeleteEpisode)).Methods("DELETE")
}
