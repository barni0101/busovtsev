document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggleExtension');
  const toggleLabel = document.getElementById('toggleLabel');

  // Загружаем сохраненное состояние
  chrome.storage.sync.get(['enabled'], function(result) {
    toggle.checked = result.enabled !== false; // По умолчанию включено
    updateLabel(toggle.checked);
  });

  // Обработчик изменения переключателя
  toggle.addEventListener('change', function() {
    const isEnabled = this.checked;
    chrome.storage.sync.set({ enabled: isEnabled }, function() {
      updateLabel(isEnabled);
      
      // Обновляем вкладку при изменении состояния
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggle", enabled: isEnabled});
      });
    });
  });

  function updateLabel(isEnabled) {
    toggleLabel.textContent = isEnabled ? 'Расширение включено' : 'Расширение выключено';
  }
});