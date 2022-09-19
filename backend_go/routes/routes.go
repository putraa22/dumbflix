package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	// TodoRoutes(r)
	UserRoutes(r)
	FilmRoutes(r)
	CategoryRoutes(r)
	TansactionRoutes(r)
	EpisodeRoutes(r)
	AuthRoutes(r)
}
