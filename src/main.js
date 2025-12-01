const burgerButton = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const repairMenu = document.querySelector('.repair_menu');
const statusMenu = document.querySelector('.status_menu');
const closeMainButton = document.querySelector('.close-main');
const closeRepairButton = document.querySelector('.close-repair');
const closeStatusButton = document.querySelector('.close');
const blurOverlay = document.querySelector('.blur');
const statusButton = document.querySelector('.status');

// Функция проверки ширины экрана
function isDesktop() {
    return window.innerWidth >= 1440;
}

// Функции блокировки/разблокировки скролла
function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.height = '';
}

// Функция открытия основного меню (только для мобильных)
function openMainMenu() {
    if (isDesktop()) return; // На десктопе меню всегда видно
    
    blurOverlay.style.display = 'block';
    menu.style.display = 'block';
    
    setTimeout(() => {
        blurOverlay.classList.add('active');
        menu.classList.add('active');
    }, 10);
    
    disableScroll();
}

// Функция открытия меню ремонта (работает всегда)
function openRepairMenu() {
    blurOverlay.style.display = 'block';
    repairMenu.style.display = 'block';
    
    setTimeout(() => {
        blurOverlay.classList.add('active');
        repairMenu.classList.add('active');
    }, 10);
    
    disableScroll();
}

// Функция открытия меню статуса (работает всегда)
function openStatusMenu() {
    blurOverlay.style.display = 'block';
    statusMenu.style.display = 'block';
    
    setTimeout(() => {
        blurOverlay.classList.add('active');
        statusMenu.classList.add('active');
    }, 10);
    
    disableScroll();
}

// Функция закрытия меню
function closeMenu() {
    blurOverlay.classList.remove('active');
    menu.classList.remove('active');
    repairMenu.classList.remove('active');
    statusMenu.classList.remove('active');
    
    setTimeout(() => {
        blurOverlay.style.display = 'none';
        menu.style.display = 'none';
        repairMenu.style.display = 'none';
        statusMenu.style.display = 'none';
        enableScroll();
    }, 300);
}

// Делегирование событий для кнопок
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('repair') || e.target.closest('.repair')) {
        e.preventDefault();
        openRepairMenu();
    }
    
    if (e.target.classList.contains('status') || e.target.closest('.status')) {
        e.preventDefault();
        openStatusMenu();
    }
});

// Обработчики
burgerButton.addEventListener('click', openMainMenu);
statusButton.addEventListener('click', openStatusMenu);
closeMainButton.addEventListener('click', closeMenu);
closeRepairButton.addEventListener('click', closeMenu);
closeStatusButton.addEventListener('click', closeMenu);
blurOverlay.addEventListener('click', closeMenu);

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && (menu.classList.contains('active') || repairMenu.classList.contains('active') || statusMenu.classList.contains('active'))) {
        closeMenu();
    }
});

// При изменении размера окна
window.addEventListener('resize', function() {
    // Если перешли на десктоп и меню открыто как модальное - закрываем его
    if (isDesktop() && menu.classList.contains('active')) {
        closeMenu();
    }
});