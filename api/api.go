package main

import (
	"fmt"
	"log"
	"math"
	"math/rand"
	"net/http"
	"time"
)

func getProductivity() float64 {
	return math.Max(0, math.Min(1, 0.6+rand.NormFloat64()*0.2))
}

func withLogging(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s from %s", r.URL.Path, r.RemoteAddr)
		h.ServeHTTP(w, r)
	})
}

func main() {

	rand.Seed(time.Now().UnixNano())

	fileServer := withLogging(http.FileServer(http.Dir("./static")))
	http.Handle("/static/", http.StripPrefix("/static", fileServer))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s from %s", r.URL.Path, r.RemoteAddr)
		http.ServeFile(w, r, "./static/index.html")
	})

	http.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s from %s", r.URL.Path, r.RemoteAddr)
		w.Header().Set("Content-Type", "application/json")

		fmt.Fprintf(w, "{\"productivity\": %v}", getProductivity())
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
