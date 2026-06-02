
#Generate Compilled Binary
GOOS=linux GOARCH=amd64 go build -o my-go-webserver main.go

#Move to secure location
sudo mv my-go-webserver /usr/local/bin/

