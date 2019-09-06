window.onload = function() {
  initMobileMenu('.c-main-logo', '.c-menu--mobile');
  setSalesDate('.c-navbar__sale--date');
};

function initMobileMenu(triggerSelector, drawerSelector) {
  const trigger = document.querySelector(triggerSelector);
  const drawer = document.querySelector(drawerSelector);
  trigger.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });
}

function setSalesDate(selector) {
  const dateBlock = document.querySelector(selector);
  dateBlock.innerHTML = getNextMonday();
}

function getNextMonday() {
  const currentDate = new Date();
  const nextMondayDate = new Date();

  // Проверяем порядковый номер дня недели
  if (currentDate.getDay()) {
    // !=0 (не воскресенье)
    nextMondayDate.setDate(currentDate.getDate() + 8 - currentDate.getDay());
  } else {
    // ==0 Воскресенье
    nextMondayDate.setDate(date.getDate() + 1);
  }

  return `${nextMondayDate.getDate()}.${nextMondayDate.getMonth()}.${nextMondayDate.getFullYear()}`;
}
