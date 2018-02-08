# ASCII Kiosk

Node application meant to run on a Raspberry Pi connected to a Dymo thermal printer. It serves a web application that is meant to run on the Chrome Browser on an Android phone (Pixel 2). The Raspberry Pi is meant to create a local ad hoc network for the Android phone to connect to.

Node application serves a web application page that accesses camera and runs ASCII filter on camera input. The phone is meant to direct browser to a page served on local ad hoc network and save to home page. This allows it to run as a web application that looks like a native application with little installation

User is encouraged to use speech-to-text input to create a quote of a certain maximum length.

Upon taking picture, the web client client takes ASCII filtered image is superimposed with the quote to send to server as an image (either file upload or base64 encode) which then directs to print on the Dymo printer.

## Install

## Used references

[Andrei Gheorge's example](https://github.com/idevelop/ascii-camera}

## Generating keys for https

```bash
openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```
