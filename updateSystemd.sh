#There exists a softlink in /usr/local/bin/indoshon-web-routes, systemd points to this link
#This link points to the binary in this directory

set -e

#Generate Compilled Binary
echo "Compilling new binary of main.go"
GOOS=linux GOARCH=amd64 go build -o indoshon-web-routes main.go

#Restart the webroutes service after compilatio
echo "Restarting systemd service for web routes"
sudo systemctl restart indoshon-web-routes

echo "Successfully restart go binary service"
