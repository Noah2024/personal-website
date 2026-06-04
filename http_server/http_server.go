package https_server

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

// Web secret initalized at runtime from .env
var webSecret = ""
var updatePath = ""

func handleApiRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello testing the UPDATE url %s\n", r.URL.Path)
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

// Admittidly, some ai was used in the hash checking, I couln't find amazing documentation
func handleWebsiteUpdate(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Processing updateAPI Request")
	payload, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read body of request", http.StatusInternalServerError)
		fmt.Println("Failed to read body of request")
		return
	}
	defer r.Body.Close()
	signatureHeader := r.Header.Get("X-Hub-Signature-256")
	if signatureHeader == "" {
		http.Error(w, "Missing X-Hub-Signature header", http.StatusUnauthorized)
		fmt.Println("Missing X-Hub-Signature header")
		return
	}
	parts := strings.SplitN(signatureHeader, "=", 2)
	if len(parts) != 2 || parts[0] != "sha256" {
		http.Error(w, "Invalid signature format", http.StatusUnauthorized)
		fmt.Println("Invalid signature format")
		return
	}

	payloadSignature := parts[1]
	fmt.Println(payloadSignature)
	fnt.Println(expectedSignature)
	mac := hmac.New(sha256.New, []byte(webSecret))
	mac.Write(payload)
	expectedMAC := mac.Sum(nil)
	expectedSignature := hex.EncodeToString(expectedMAC)
	if hmac.Equal([]byte(payloadSignature), []byte(expectedSignature)) {
		fmt.Println("Webhook verified! Starting update")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Webhook processed"))
		// Executing script to pull newest changed + reload website + api routes
		cmd := exec.Command("bash", updatePath)
		_, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Printf("Error updating HTML: %s\n", err)
		}
	} else {
		http.Error(w, "Invalid Signature", http.StatusUnauthorized)
		fmt.Println("Invalid Signature")
	}
	//bodyString := string(bodyBytes)
	fmt.Println("Finished processing update route")
	//fmt.Println(bodyString)
}

func validateEnv() {
	webSecret = os.Getenv("webhooksecret")
	updatePath = os.Getenv("updatePath")
	if webSecret == "" {
		fmt.Println("ERROR: no webhook secret found in .env")
	}
	if updatePath == "" {
		fmt.Println("ERROR: no getFromGit found in .env")
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
