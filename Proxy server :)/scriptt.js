function sendRequest() {
  // Send a request to the proxy server
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080?url=http://example.com"); // Change URL and port as necessary
  xhr.onload = function() {
    console.log(xhr.responseText);
  };
  xhr.send();
}
