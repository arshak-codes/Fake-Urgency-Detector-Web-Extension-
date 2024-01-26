chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'detectDarkPatterns') {
    var keywordResult = detectWithKeywords();
    var urgencyScarcityResult = detectFakeUrgencyAndScarcity(keywordResult);
    sendResponse({ result: urgencyScarcityResult });
  }
});

function detectFakeUrgencyAndScarcity(keywordResult) {
  var fakeUrgencyDetected = false;
  var fakeScarcityDetected = false;

  // Check for countdown timers indicating fake urgency
  var countdownTimers = document.querySelectorAll('.countdown-timer');
  if (countdownTimers.length > 0) {
    fakeUrgencyDetected = true;
  }

  // Check for stock indicators indicating fake scarcity
  var stockIndicators = document.querySelectorAll('.stock-indicator');
  if (stockIndicators.length > 0) {
    fakeScarcityDetected = true;
  }

  // Return the detection result
  if (fakeUrgencyDetected || fakeScarcityDetected || keywordResult) {
    return 'Detected fake urgency or scarcity on the current page. Keyword: ' + keywordResult;
  } else {
    return 'No fake urgency or scarcity detected on the current page.';
  }
}


function detectWithKeywords() {
  // Keywords associated with fake urgency and scarcity
  var keywords = ['limited time offer', 'stocks running out', 'hurry', 'act now'];

  // Check for the presence of keywords in the text content
  var detectedKeyword = null;
  Array.from(document.querySelectorAll('*')).some(element => {
    var textContent = element.textContent.toLowerCase();
    return keywords.some(keyword => {
      if (textContent.includes(keyword)) {
        detectedKeyword = keyword;
        return true;
      }
      return false;
    });
  });

  // Return the detected keyword
  return detectedKeyword;
}

