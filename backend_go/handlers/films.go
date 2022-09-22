package handlers

import (
	filmsdto "dumbflix/dto/film"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerFilm struct {
	FilmRepository repositories.FilmRepository
}

var path_file = os.Getenv("PATH_FILE")

func HandlerFilm(FilmRepository repositories.FilmRepository) *handlerFilm {
	return &handlerFilm{FilmRepository}
}

func (h *handlerFilm) FindFilms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	films, err := h.FilmRepository.FindFilms()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	// Untuk mengembed path file di property thumbnailfilm
	for i, p := range films {
		films[i].ThumbNail = os.Getenv("PATH_FILE") + p.ThumbNail
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: films}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerFilm) GetFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var film models.Film
	film, err := h.FilmRepository.GetFilm(id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// path untuk membuat api file image
	film.ThumbNail = os.Getenv("PATH_FILE") + film.ThumbNail

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseFilm(film)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerFilm) CreateFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get dataFile from midleware and store to filename variable here ...
	dataContex := r.Context().Value("image")
	filename := dataContex.(string)

	// year, _ := strconv.Atoi(r.FormValue("year"))
	category_id, _ := strconv.Atoi(r.FormValue("category_id"))

	request := filmsdto.CreateFilmRequest{
		Title:       r.FormValue("title"),
		ThumbNail:   filename,
		LinkFilm:   	 r.FormValue("linkFilm"),
		Year:        r.FormValue("year"),
		CategoryID:  category_id,
		Description: r.FormValue("description"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	film := models.Film{
		Title:       request.Title,
		ThumbNail:   filename,
		LinkFilm: request.LinkFilm,
		Year:        request.Year,
		CategoryID:  category_id,
		Category:    models.CategoryResponse{},
		Description: request.Description,
	}

	// err := mysql.DB.Create(&film).Error
	film, err = h.FilmRepository.CreateFilm(film)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	film, _ = h.FilmRepository.GetFilm(film.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: film}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerFilm) UpdateFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(filmsdto.UpdateFilmRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	film, err := h.FilmRepository.GetFilm(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Title != "" {
		film.Title = request.Title
	}

	if request.ThumbNail != "" {
		film.ThumbNail = request.ThumbNail
	}

	if request.LinkFilm != "" {
		film.LinkFilm = request.LinkFilm
	}

	if request.Description != "" {
		film.Description = request.Description
	}

	data, err := h.FilmRepository.UpdateFilm(film)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerFilm) DeleteFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("ContentType", "application/json")

	// Get product id
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	film, err := h.FilmRepository.GetFilm(id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	deleteFilm, err := h.FilmRepository.DeleteFilm(film)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseDelFilm(deleteFilm)}
	json.NewEncoder(w).Encode(response)
}

func convertResponseFilm(f models.Film) models.FilmResponse {
	return models.FilmResponse{
		ID:          f.ID,
		Title:       f.Title,
		ThumbNail:   f.ThumbNail,
		LinkFilm: f.LinkFilm,
		Year:        f.Year,
		Category:    f.Category,
		Description: f.Description,
	}
}

func convertResponseDelFilm(f models.Film) models.FilmResponse {
	return models.FilmResponse{
		ID: f.ID,
		Title: f.Title,
		Year: f.Year,
	}
}
