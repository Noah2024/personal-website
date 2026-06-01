package https_server

import (
	"fmt"
	"io"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello testing the url %s\n", r.URL.Path)
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read body of request", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	bodyString := string(bodyBytes)
	fmt.Println(bodyString)

	// err := os.WriteFile("tmp.json", []byte(r.Body))
}

func Start() {
	http.HandleFunc("/", helloHandler)

	fmt.Println("Starting server at :8088")
	if err := http.ListenAndServe(":8088", nil); err != nil {
		panic(err)
	}
}
