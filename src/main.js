const burgerButton = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const repairMenu = document.querySelector('.repair_menu');
const statusMenu = document.querySelector('.status_menu');
const closeMainButton = document.querySelector('.close-main');
const closeRepairButton = document.querySelector('.close-repair');
const closeStatusButton = document.querySelector('.close');
const blurOverlay = document.querySelector('.blur');
const statusButton = document.querySelector('.status');

// Находим все кнопки слайд-меню
const slideMenuButtons = document.querySelectorAll('.slideMenu__button');

// Функция для снятия выделения со всех кнопок
function removeAllSelections() {
    slideMenuButtons.forEach(button => {
        button.classList.remove('slideMenu__button--selected');
    });
}

// Добавляем обработчики клика на каждую кнопку
slideMenuButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Снимаем выделение со всех кнопок
        removeAllSelections();
        // Добавляем выделение текущей кнопке
        this.classList.add('slideMenu__button--selected');
    });
});

// Инициализация: выделяем первую кнопку при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (slideMenuButtons.length > 0) {
        // Проверяем, есть ли уже выделенная кнопка
        const hasSelected = document.querySelector('.slideMenu__button.slideMenu__button--selected');
        if (!hasSelected) {
            // Выделяем первую кнопку
            slideMenuButtons[0].classList.add('slideMenu__button--selected');
        }
    }
});




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

// Функция управления видимостью меню на десктопе
function handleDesktopMenu() {
    if (isDesktop()) {
        // На десктопе меню всегда видно
        menu.style.display = 'block';
        menu.classList.add('active');
    } else {
        // На мобильных скрываем меню
        menu.style.display = 'none';
        menu.classList.remove('active');
    }
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
    blurOverlay.style.zIndex = '1004';
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
    blurOverlay.style.zIndex = '1004';
    statusMenu.style.display = 'block';
    
    setTimeout(() => {
        blurOverlay.classList.add('active');
        statusMenu.classList.add('active');
    }, 10);
    
    disableScroll();
}

// Функция закрытия всех меню
function closeMenu() {
    blurOverlay.classList.remove('active');
    menu.classList.remove('active');
    repairMenu.classList.remove('active');
    statusMenu.classList.remove('active');
    
    setTimeout(() => {
        blurOverlay.style.display = 'none';
        blurOverlay.style.zIndex = '';
        
        // Для repairMenu и statusMenu всегда скрываем
        repairMenu.style.display = 'none';
        statusMenu.style.display = 'none';
        
        // Для menu только на мобильных, на десктопе оставляем видимым
        if (!isDesktop()) {
            menu.style.display = 'none';
        }
        
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

// При загрузке страницы и изменении размера окна
window.addEventListener('load', handleDesktopMenu);
window.addEventListener('resize', function() {
    handleDesktopMenu();
    
    // Если перешли на десктоп и меню открыто как модальное - закрываем блюр
    if (isDesktop() && blurOverlay.classList.contains('active')) {
        closeMenu();
    }
});


// Находим все элементы меню
const menuItems = document.querySelectorAll('.menu__text--line, .menu__text--line--active');

// Добавляем обработчики для наведения
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Удаляем active у всех элементов
        menuItems.forEach(el => {
            el.classList.remove('menu__text--line--active');
        });
        // Добавляем active текущему элементу
        this.classList.add('menu__text--line--active');
    });
});

// Опционально: можно добавить сохранение active при клике
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        // Удаляем active у всех элементов
        menuItems.forEach(el => {
            el.classList.remove('menu__text--line--active');
        });
        // Добавляем active текущему элементу
        this.classList.add('menu__text--line--active');
    });
});