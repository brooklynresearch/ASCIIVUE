mkdir -p -- "encryption-keys"

if [ ! -f "encryption-keys/csr.pem" ]; then
openssl req -newkey rsa:2048 -new -nodes -keyout encryption-keys/key.pem -out encryption-keys/csr.pem

openssl x509 -req -days 365 -in encryption-keys/csr.pem -signkey encryption-keys/key.pem -out encryption-keys/server.crt
fi
