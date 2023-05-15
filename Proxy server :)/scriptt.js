function sendRequest() {
  // Send a request to the proxy server
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://google.com"); // Change URL and port as necessary
  xhr.onload = function() {
    console.log(xhr.responseText);
  };
  xhr.send();
}
