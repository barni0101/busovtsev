// Фоновая страница (может быть пустой для этого расширения)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Hide Credentials extension installed');
});