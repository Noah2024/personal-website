package https_server

import (
	"os"
	"fmt"
	"io"
	"net/http"
	"strings"
	"github.com/joho/godotenv"


	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

//Web secret initalized at runtime from .env
var webSecret = ""

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

//Admittidly, some ai was used in the hash checking, I couln't find amazing documentation
func handleWebsiteUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello testing the UPDATE url %s\n", r.URL.Path)

	payload, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read body of request", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	signatureHeader := r.Header.Get("X-Hub-Signature-256")
	if signatureHeader == ""{
		http.Error(w, "Missing X-Hub-Signature header", http.StatusUnauthorized)
		return
	}

	parts := strings.SplitN(signatureHeader, "=", 2)
	if len(parts) != 2 || parts[0] != "sha256"{
		http.Error(w, "Invalid signature format", http.StatusUnauthorized)
		return
	}

	payloadSignature := parts[0]
	
	mac := hmac.New(sha256.New, []byte(webSecret))
	mac.Write(payload)
	expectedMAC := mac.Sum(nil)
	expectedSignature := hex.EncodeToString(expectedMAC)
	
	if hmac.Equal([]byte(payloadSignature), []byte(expectedSignature)){
		fmt.Println("Webhook verified! Starting update")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Webhook processed"))
	}else{
		http.Error(w, "Invalid Signature", http.StatusUnauthorized)
	}
	//bodyString := string(bodyBytes)
	fmt.Println("Finished processing update route")
	//fmt.Println(bodyString)
}

func validateEnv(){
	fmt.Println("Loading .env file")
        err := godotenv.Load("../../.env")
        if err != nil {
                fmt.Println("ERROR: could not load .env file")
        }
	webSecret = os.Getenv("webhooksecret")
	if webSecret == "" {
		fmt.Println("ERROR: no webhook secret found in .env")
	}
}

func Start() {
	//nginx proxy points indoshon.com/api twords the following root
	//Making all other routes indoshon.com/api/route
	validateEnv()
	
	http.HandleFunc("/", handleApiRoot)
	http.HandleFunc("/update", handleWebsiteUpdate)

	fmt.Println("Starting server at :8088")
	if err := http.ListenAndServe(":8088", nil); err != nil {
		panic(err)
	}
}
