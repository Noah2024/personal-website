package https_server

import (
	"fmt"
	"io"
	"net/http"
)

func handleApiRoot(w http.ResponseWriter, r *http.Request) {
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

func handleWebsiteUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello testing the UPDATE url %s\n", r.URL.Path)
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read body of request", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	bodyString := string(bodyBytes)
	fmt.Println("UPDATE ROUTE BELOW")
	fmt.Println(bodyString)
}

func Start() {
	//nginx proxy points indoshon.com/api twords the following root
	//Making all other routes indoshon.com/api/route
	fmt.Println("PLEASE GOD SHOW UP IN JOURNAL")
	http.HandleFunc("/", handleApiRoot)
	http.HandleFunc("/update", handleWebsiteUpdate)

	fmt.Println("Starting server at :8088")
	if err := http.ListenAndServe(":8088", nil); err != nil {
		panic(err)
	}
}
