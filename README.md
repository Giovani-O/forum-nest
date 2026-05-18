# forum-nest

This README is still incomplete, but I needed to register how to generate the RS256 private and public keys. This should be kept, even after we write a new README.

On Fedora 44:
```bash
# Generate private key
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# Extract the public key
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Then, convert to base64, you will use the base64 on the .env
cat private_key.pem | base64 -w 0 > private_key_base64.txt
cat public_key.pem | base64 -w 0 > public_key_base64.txt
```
