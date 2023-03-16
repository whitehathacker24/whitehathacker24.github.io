#include <iostream>
#include <string>
#include <sstream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <cstring>
#include <unistd.h>

int main() {
  // Create a socket for the proxy server
  int server_socket = socket(AF_INET, SOCK_STREAM, 0);
  if (server_socket < 0) {
    std::cerr << "Error creating server socket\n";
    return 1;
  }

  // Bind the socket to a port and start listening for connections
  struct sockaddr_in server_address;
  server_address.sin_family = AF_INET;
  server_address.sin_addr.s_addr = INADDR_ANY;
  server_address.sin_port = htons(8080); // Change to desired port
  if (bind(server_socket, (struct sockaddr*) &server_address, sizeof(server_address)) < 0) {
    std::cerr << "Error binding server socket\n";
    return 1;
  }
  listen(server_socket, 5);

  while (true) {
    // Accept a new client connection
    struct sockaddr_in client_address;
    socklen_t client_address_size = sizeof(client_address);
    int client_socket = accept(server_socket, (struct sockaddr*) &client_address, &client_address_size);
    if (client_socket < 0) {
      std::cerr << "Error accepting client connection\n";
      continue;
    }

    // Read the request from the client
    std::string request;
    char buffer[1024];
    int bytes_read;
    do {
      bytes_read = recv(client_socket, buffer, 1024, 0);
      if (bytes_read < 0) {
        std::cerr << "Error reading from client socket\n";
        close(client_socket);
        continue;
      }
      request.append(buffer, bytes_read);
    } while (bytes_read == 1024);

    // Extract the requested URL from the query parameter
    std::istringstream iss(request);
    std::string line;
    std::string url;
    while (std::getline(iss, line)) {
      if (line.find("GET ") == 0 || line.find("POST ") == 0) {
        url = line.substr(4, line.find(" ", 4) - 4);
        break;
      }
    }
    int url_start = url.find("?url=") + 5;
    int url_end = url.find("&");
    if (url_end == std::string::npos) {
      url_end = url.length();
    }
    url = url.substr(url_start, url_end - url_start);

    // Forward the request to the destination server
    struct sockaddr_in destination_address;
    destination_address.sin_family = AF_INET;
    destination_address.sin_port = htons(80); // Change to desired port
    struct hostent* dest = gethostbyname(url.c_str());
    if (dest == NULL) {
      std::cerr << "Error resolving host " << url << "\n";
      close(client_socket);
      continue;
    }
   
