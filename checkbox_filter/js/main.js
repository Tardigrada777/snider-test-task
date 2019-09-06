const checkboxContainer = document.querySelector('.star-guest-filter-holder');
const storageKey = 'checkboxesMatrix';
const lastkey = 'lastChecked';

function saveMatrixToStorage(matrix = {}) {
  /*
    Здесь может быть логика отправки
    данных на сервер, если нужно.
  */
  const matrixs = JSON.stringify(matrix);
  localStorage.setItem(storageKey, matrixs);
}

function getMatrixFromStorage() {
  /*
    Здесь может быть логика получения
    данных с сервера, если нужно.
  */
  const matrixs = localStorage.getItem(storageKey);
  if (matrixs === null) return null;
  return JSON.parse(matrixs);
}

// Возвращает id последнего выбранного чекбокса
function getLastChecked() {
  const lastId = localStorage.getItem(lastkey);
  return lastId;
}

function init() {
  const inputs = checkboxContainer.querySelectorAll('input[type="checkbox"]');
  let matrix = getMatrixFromStorage();

  // Если matrix - null,
  // значит генерируем матрицу впервые
  if (!matrix) {
    matrix = {};
    inputs.forEach(ch => {
      matrix[ch.value] = {
        id: ch.id,
        value: 0
      };
    });
  }

  const max = getMaximum(matrix);
  const lastChecked = getLastChecked();
  if (max === null) saveResult(lastChecked);
  saveResult(max);

  // Устанавливаем обработчики
  inputs.forEach(ch => {
    ch.addEventListener('change', () => {
      // Проверяем состояние чебокса до события
      // Если оно было true, выходим из функции
      if (!ch.checked) return;

      // Если нет, значит чекбокс выбирается
      // из состояния false, следовательно
      // выполняем анализ

      // 0. Фиксируем последний выбранные чекбокс
      localStorage.setItem(lastkey, ch.id);

      // 1.Обновляем счетчики до актуальных значений
      matrix[ch.value].value += 1;

      // 2. Сохраняем изменения
      saveMatrixToStorage(matrix);

      // 3. Вычисляем максимум
      const max = getMaximum(matrix);
      const lastChecked = getLastChecked();

      // Если есть хотя бы один чекбокс
      // с таким же количеством кликов
      // сохраняем последний выбранный
      if (max === null) return saveResult(lastChecked);

      // Если нет, сохраняем чекбокс с максимальным
      // количеством кликов
      saveResult(max);
    });
  });

  return matrix;
}

function getMaximum(matrix = {}) {
  let max = 0;
  let checkboxId = null;
  const hash = {};

  for (let key in matrix) {
    const value = matrix[key].value;

    if (value in hash) return null;
    if (value > max) {
      max = value;
      hash[max] = true;
      checkboxId = matrix[key].id;
    }
  }
  return checkboxId;
}

function saveResult(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  window.filter_results = checkbox;
}

window.onload = function() {
  init();
};
