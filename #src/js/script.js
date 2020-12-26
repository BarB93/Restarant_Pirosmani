window.onload = function () {
    @@include('_webpcss.js');
    @@include('_my.js');



    //<--##################
    //Описание:реализация фунцкионала выезда и скрытия меню при помощи бургера
    let burger = document.getElementById("burger")
    let closeMenu = document.getElementById("close-menu")
    let menu = document.getElementById("menu")

    if (burger && menu && closeMenu) {


        burger.addEventListener("click", function (event) {
            event.stopPropagation()
            menu.classList.add("_active")
        })

        closeMenu.addEventListener("click", function (event) {
            event.stopPropagation()

            menu.classList.remove("_active")
        })
    }
    //###-->


    //<--##################
    // Описание: Фиксация header при скроле 
    //header
    {
        let header = document.querySelector(".header")
        //секция с пунктами катекорий
        let category = document.querySelector(".category")
        //отступ от начала страницы до блока .cantainer
        let offsetFromPageTopToBottomCategory = getOffsetFromTopWindowToBottomCategory();
        //переменная в которой записывается расстояние от верха сайта до верха вьюпорта
        let offsetTop = 0

        if (header && category) {
            //фиксация меню при закрузки страницы при соблюдении условий в функции ниже
            fixMenu()

            //событие на скрол страницы
            window.addEventListener('scroll', function () {
                //расстояние от верха сайта до верха текущего вьюпорта
                offsetTop = window.scrollY;

                //фиксация меню при скроле
                fixMenu()
            })

            //функция для фиксации меню
            function fixMenu() {
                if (window.scrollY > offsetFromPageTopToBottomCategory) {
                    header.classList.add("_active")
                    category.classList.add("_active")
                } else {
                    header.classList.remove("_active")
                    category.classList.remove("_active")

                }
            }
        }
    }// ####-->

    //<--################## 
    // Слайдеры
    {
        //<--################## 
        //Описание:подключаем Swiper к mainslider
        let mainslider = document.getElementById("mainslider")

        if (mainslider) {
            var mySwiperMainslider = new Swiper(mainslider, {
                pagination: {
                    el: '.mainslider__swiper-pagination',
                },
            });
        }
        // ###-->

        //<--##################
        //#подключаем Swiper слайдерЫ к sections
        let sectionsliders = document.querySelectorAll(".section__items")

        if (sectionsliders) {

            for (let el of sectionsliders) {
                let paginationContainer = el.querySelector(".section__pagination")
                var mySwiperSection = new Swiper(el, {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    observer: true,
                    autoHeight: true,
                    pagination: {
                        el: paginationContainer,
                    },
                    breakpoints: {
                        // when window width is >= 475px
                        575: {
                            slidesPerView: 3,
                            // spaceBetween: 20
                        },
                        // when window width is >= 480px
                        775: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        },
                        // // when window width is >= 640px
                        // 640: {
                        //   slidesPerView: 4,
                        //   spaceBetween: 40
                        // }
                    }
                });

            }
        }
        // #####################-->

        //<--##################
        //Описание:подключаем Swiper к category
        let categorySlider = document.getElementById("category")
        let mySwiperCategory
        if (categorySlider) {
            mySwiperCategory = new Swiper(categorySlider, {

                slidesPerView: "auto",
                simulateTouch: true,
                touchRatio: 0.90,
                resistance: true,
                resistanceRatio: 0,
                spaceBetween: 30,
                observer: true,






            });
        }

    }// ###-->



    //<--##################
    //Описание: Заполнение пунктами категорий меню для пк, планшета и блока категорий
    //массив строк КАТЕГОРИЙ обернуных в тег ссылки и добавленой иконкой соответсвующей категории
    const categoriesArray = [
        '<a href="#category-body" data-category="01"><span class="menu__icon icon-soup2"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>Супы</a>',
        '<a href="#category-body" data-category="02"><span class="menu__icon icon-khachapuri"></span>Хачапури</a>',
        '<a href="#category-body" data-category="03"><span class="menu__icon icon-cold-snacks"></span>Холодные закуски</a>',
        '<a href="#category-body" data-category="05"><span class="menu__icon icon-khinkali"></span>Хинкали</a>',
        '<a href="#category-body" data-category="04"><span class="menu__icon icon-kebab"></span>Шашлык</a>',
        '<a href="#category-body" data-category="06"><span class="menu__icon icon-sauce"></span>Соусы</a>',
        '<a href="#category-body" data-category="03"><span class="menu__icon icon-salad"></span>Салаты</a>',
        '<a href="#category-body" data-category="10"><span class="menu__icon icon-hot-dishes"></span>Горячие блюда</a>',
        '<a href="#category-body" data-category="08"><span class="menu__icon icon-garnish"></span>Гарнир</a>',
        '<a href="#category-body" data-category="09"><span class="menu__icon icon-dessert"></span>Десерты</a>',
        '<a href="#category-body" data-category="07"><span class="menu__icon icon-drinks"></span>Напитки</a>'
    ]

    //Контейнер категорий
    let $categoryWrapper = document.querySelector(".category__wrapper")
    //Контайнер мобильного подменю
    let $sumenuMobileContainer = document.querySelector('#submenuMobileContainer')
    //Контайнер десктопного подменю
    let $submenuPcContainer = document.querySelector('#submenuPcContainer')

    if ($categoryWrapper && $sumenuMobileContainer && $submenuPcContainer) {
        // пременная для контента в контейнер категорий
        outCat = ""
        // пременная для контента в контейнер меню, подходит и для Мобильного, и для ПК
        outMenu = ""

        for (let item of categoriesArray) {

            outCat += `<div class="category__item swiper-slide">${item}</div>`
            outMenu += `<li class="submenu__link _toggle-close">
                             ${item}
                          </li>`
        }

        $categoryWrapper.innerHTML = outCat;
        $sumenuMobileContainer.innerHTML = outMenu
        $submenuPcContainer.innerHTML = outMenu

        toggle()

    }//###-->

    let $categoryItems = null
    //<--##################
    //Описание:формирование и рендер карточек товара, 1)запрос на сервер, получаем данные о товарах и 2)после вызываем функцию рендера 
    {
        fetch('https://barovskiy777.github.io/site/catalog.json')
            .then(r => r.json())
            .then(data => {

                //рендерим товары на страницу
                renderProducts(data)
                $categoryItems = document.querySelectorAll(".category-body__item")
                puginationProducts()


            })
            .catch(function (error) {
                console.error('Request failed', error)
            });
    }// ###-->


    //<--##################
    //Описаниe: фильтрация категорий при нажатии на пункт категории и скролл к контейнеру категорий
    //пункты меню категорий
    const categoryMenuItems = document.querySelectorAll('a[href*="#category"')
    //контаинер для заголовока категории,для динамического добавления
    const $categoryTitle = document.querySelector('.category-body__title')
    //контаинер для добавление товаров
    const $categoryBody = document.querySelector('#category-body__content')


    if (categoryMenuItems) {

        //Цикл по пунктам меню и вешаем на них обработчик клика
        Array.prototype.forEach.call(categoryMenuItems, (el) => {

            //при клике на пункт категории меняем заголовок и филтруем каточки товаров
            el.addEventListener("click", function (e) {
                e.preventDefault()
                el.closest(".menu-pc__item__submenu")

                //меняем заголовок
                $categoryTitle.innerHTML = el.innerText.toLowerCase()

                //карточки, товары 
                $categoryBody.innerHTML = ""
                for ($item of $categoryItems) {
                    $categoryBody.appendChild($item)
                }

                //реализация фильтрации
                Array.prototype.forEach.call($categoryItems, (item) => {
                    //получаем id товара
                    let itemId = item.dataset.productId
                    //получаем id категории
                    let categoryId = el.dataset.category;
                    if (itemId === categoryId) {
                        item.classList.add("_active")
                    }
                    else {
                        item.classList.remove("_active")
                    }

                })

                puginationProducts(el.dataset.category)

                //контайнер для карточек товара
                let $targetBlock = document.querySelector(el.getAttribute("href")),
                    //высота фиксированого блока, для смещения вверх
                    topOffset = getHeightFixedMenu(),
                    elementPosition = $targetBlock.getBoundingClientRect().top,
                    offsetPosition = elementPosition - topOffset
                // поправка на уменьшение размера фиксированного верхнего меню
                if (!document.querySelector(".header").classList.contains("_active")) offsetPosition -= 150
                // console.log(offsetPosition)

                if ($targetBlock) {
                    // скролл к контейнеру с товарами
                    window.scrollBy({
                        top: offsetPosition,
                        behavior: "smooth"
                    })


                }


            })
        })
    }
    // ###-->


}

//Functions
//------------------------------------------------------------------
// <--func
// функция рендера товаров
function renderProducts(data) {

    // общий контаинер для товаров
    let $bodyCategoriesContainer = document.getElementById("category-body__content"),
        // контаинер для промо товаров
        $promoContainer = document.getElementById("promo-section__wrapper"),
        // контаинер для новых товаров
        $newProductsContainer = document.getElementById("new-roducts-section__wrapper"),
        // контаинер для рекомендованных товаров
        $recommendsContainer = document.getElementById("recommends-section__wrapper")

    //контент для общего контайнера с товарами
    let out = "",
        //контент для общего контайнера с товарами
        newProduct = "",
        promo = ""

    // цикл где формируем контет из товаров для новинок, рекомендаций, промо и общего набора товаров
    for (key in data) {
        let id = key.substr(0, 2)

        out += `<div class="category-body__item _active _pagination-item" data-product-id="${id}">
                        <div class="product-card">
                            <div class="product-card__image"><img src="${data[key].image}" alt=""></div>
                            <div class="product-card__name">${data[key].name}</div>
                            <div class="product-card__description">${data[key].description}</div>
                            <div class="product-card__bottom">
                                <div class="product-card__rating rating" data-rating-total="${data[key].rating}">
                                    <div class="rating__item" data-rating-item="5"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="4"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="3"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="2"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="1"><span class="icon-star"></span></div>
                                </div>
                                <div class="product-card__cost ">
                                    <span class="product-card__cost__price _rub">${data[key].price}</span>
                                    <span class="product-card__cost__weight">За ${data[key].quantity}${data[key].measurement}.</span>
                                </div>
                                <button class="product-card__cart btn" data-articul='${key}'>В корзину</button>
                            </div>
                        </div>
                    </div>`

        //если это новый товар
        if (data[key].new) {
            newProduct += `
            <div class="section__item swiper-slide">
                <div class="product-card">
                    <div class="product-card__image"><img src="${data[key].image}" alt=""></div>
                    <div class="product-card__name">${data[key].name}</div>
                    <div class="product-card__description">${data[key].description}</div>
                    <div class="product-card__bottom">
                        <div class="product-card__rating rating" data-rating-total="${data[key].rating}">
                            <div class="rating__item" data-rating-item="5"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="4"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="3"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="2"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="1"><span class="icon-star"></span></div>
                        </div>
                        <div class="product-card__cost ">
                            <span class="product-card__cost__price _rub">${data[key].price}</span>
                            <span class="product-card__cost__weight">За ${data[key].quantity}${data[key].measurement}.</span>
                        </div>
                        <button class="product-card__cart btn" data-articul='${key}'>В корзину</button>
                    </div>
                </div>
            </div>`
        }

        // если это промо товар
        if (data[key].promo) {
            promo += `
            <div class="section__item swiper-slide">
                <div class="product-card">
                    <div class="product-card__image"><img src="${data[key].image}" alt=""></div>
                    <div class="product-card__name">${data[key].name}</div>
                    <div class="product-card__description">${data[key].description}</div>
                    <div class="product-card__bottom">
                        <div class="product-card__rating rating" data-rating-total="${data[key].rating}">
                            <div class="rating__item" data-rating-item="5"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="4"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="3"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="2"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="1"><span class="icon-star"></span></div>
                        </div>
                        <div class="product-card__cost ">
                            <span class="product-card__cost__price _rub">${data[key].price}</span>
                            <span class="product-card__cost__weight">За ${data[key].quantity}${data[key].measurement}.</span>
                        </div>
                        <button class="product-card__cart btn" data-articul='${key}'>В корзину</button>
                    </div>
                </div>
            </div>`
        }

    }

    //заполняем общий контейнер товаров
    $bodyCategoriesContainer.innerHTML = out
    // заполнняем слайдер промо
    $promoContainer.innerHTML = promo
    // заполнняем слайдер новинок
    $newProductsContainer.innerHTML = newProduct
    // заролняем слайдер рекомендаций
    $recommendsContainer.innerHTML = promo

    //добавляем поведение звездам рейтинка в карточках товара
    setStarRaitngBehavior()


}//-->

// <--func
// получить высоту меню при фиксированной позиции( высота у него меняется в зависимостиот от ширины окна браузера)
function getHeightFixedMenu() {
    // получаем текущую ширину браузера
    let widthWindow = window.innerWidth;
    //переменная для результата
    let heightResult = ""

    if (widthWindow <= 992) heightResult = 98
    else heightResult = 122
    return heightResult
}//-->

// высчитываем высоту верхнего меню при фикседе состоящее из .header и .categories, чтобы при скроле учитывать размеры
function getSumHeightMenuAndCategory(marintTop = 10) {
    let heightHeader = +document.querySelector(".header").offsetHeight
    let heightCategoryMenu = +document.querySelector(".category").offsetHeight

    return heightHeader + heightCategoryMenu + marintTop;
}

// <-- func
//функция для подсчета расттояний, возращает объект с расстояниями от элемента до верха и левой стороны window
function offset(el) {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        heightElement = el.offsetHeight

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, bottom: rect.top + scrollTop + heightElement }
}// -->

// <-- func
//rating функционал для звездного рейтинга
function setStarRaitngBehavior() {
    //все звезды рейтинга
    const ratingItemsList = document.querySelectorAll(".rating__item")
    //трансформация коллекции в массив
    const ratingItemsArray = Array.prototype.slice.call(ratingItemsList)


    // при клике на звезду передаем ее значение в дата-атрибут родителя
    ratingItemsArray.forEach(item => {
        item.addEventListener("click", () => {
            item.parentNode.dataset.ratingTotal = item.dataset.ratingItem
        })
    });

}// -->

// <-- func
function getOffsetFromTopWindowToBottomCategory() {
    // высота элемента category
    let categoryHeight = category.offsetHeight
    //расстояние от верха страницы до верха элемента category
    let categoryOfTop = category.offsetTop
    //расстояние от верха страница до низа элемента категорий
    return categoryOfTop + categoryHeight
}//-->

@@include('_pagination.js');










