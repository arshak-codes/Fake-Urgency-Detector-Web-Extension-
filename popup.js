document.addEventListener('DOMContentLoaded', function() {
    var detectButton = document.getElementById('detectButton');
    detectButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'detectDarkPatterns' }, function(response) {
          document.getElementById('result').innerText = response.result;
        });
      });
    });
  });
  