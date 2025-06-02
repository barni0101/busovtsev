// Функция для скрытия полей ввода
function hideCredentialsFields() {
  // Получаем все возможные поля для логина/email
  const loginFields = document.querySelectorAll(`
    input[type="text"][name*="user"], 
    input[type="text"][name*="login"], 
    input[type="text"][name*="email"],
    input[name*="user"], 
    input[name*="login"], 
    input[name*="email"],
    input[type="email"]
  `);

  // Получаем все возможные поля для пароля
  const passwordFields = document.querySelectorAll(`
    input[type="password"],
    input[name*="pass"]
  `);

  // Применяем стили к полям логина
  loginFields.forEach(field => {
    field.style.backgroundColor = '#ffdddd';
    field.style.color = '#ffdddd';
    field.style.textShadow = '0 0 8px #ff0000';
    field.setAttribute('data-original-type', field.type);
    field.type = 'password';
  });

  // Применяем стили к полям пароля
  passwordFields.forEach(field => {
    field.style.backgroundColor = '#ffdddd';
    field.style.color = '#ffdddd';
    field.style.textShadow = '0 0 8px #ff0000';
  });

  return loginFields.length + passwordFields.length;
}

// Проверяем, включено ли скрытие в настройках
chrome.storage.sync.get(['enabled'], function(result) {
  if (result.enabled !== false) { // По умолчанию включено
    hideCredentialsFields();
  }
});

// Также скрываем поля при динамической загрузке страницы
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['enabled'], function(result) {
    if (result.enabled !== false) {
      hideCredentialsFields();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});