window.onload = function () {
    @@include('webpcss.js');
    @@include('functions.js');

    //реализация фунцкионала выезда и скрытия меню при помощи бургера
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
    // ################################

    //фиксация меня при скроле
    let header = document.querySelector(".header")
    let category = document.querySelector(".category")
    //расстояние от верха страницы до верха элемента category
    let categoryOfTop = category.offsetTop
    // высота элемента category
    let categoryHeight = category.offsetHeight
    //первоначальное расстояние от верха страница до низа элемента категорий
    let categoryBottom = categoryOfTop + categoryHeight
    //сумма высот элементов .category и .header
    let sumHeighHeaderAndCategory = categoryHeight + header.offsetHeight


    if (header && category) {
        fixMenu()
        window.addEventListener('scroll', function () {
            fixMenu()


        })

        //функция для фиксации меню
        function fixMenu() {
            if (window.scrollY > categoryBottom) {
                header.classList.add("_active")
                category.classList.add("_active")
                document.querySelector("body").style.paddingTop = `${sumHeighHeaderAndCategory}px`

            } else {
                header.classList.remove("_active")
                category.classList.remove("_active")
                document.querySelector("body").style.paddingTop = `0`
            }
        }


    }



    //подключаем Swiper к mainslider
    let mainslider = document.getElementById("mainslider")

    if (mainslider) {
        var mySwiperMainslider = new Swiper(mainslider, {
            pagination: {
                el: '.mainslider__swiper-pagination',
            },
        });
    }
    // ################################

    //подключаем Swiper к section
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
    // ################################

    //подключаем Swiper к category
    let categorySlider = document.getElementById("category")

    if (categorySlider) {
        var mySwiperCategory = new Swiper(categorySlider, {

            slidesPerView: "auto",
            simulateTouch: true,
            touchRatio: 0.90,
            resistance: true,
            resistanceRatio: 0,
            spaceBetween: 30,






        });
    }
    // ################################



    //01 супы
    //02 хачапури
    //03 салаты
    //04 шашлык
    //05 хинкали
    //06 соусы

    //формирование и рендер карточек товара
    loadProducts();


    //фильтрация категорий
    //пункты меню категорий
    const categoryMenuItems = document.querySelectorAll('a[href*="#c"')
    //заголовок категории
    const categoryTitle = document.querySelector('.category-body__title')



    if (categoryMenuItems) {

        Array.prototype.forEach.call(categoryMenuItems, (el) => {

            el.addEventListener("click", (e) => {
                e.preventDefault()
                console.log("inner", String.prototype.toUpperCase(el.innerText))

                categoryTitle.innerHTML = el.innerText.toLowerCase()
                //карточки, товары
                const categoryItems = document.querySelectorAll(".category-body__item")
                Array.prototype.forEach.call(categoryItems, (item) => {
                    let itemId = item.dataset.productId
                    let categoryId = el.dataset.category;
                    if (itemId === categoryId) {
                        item.classList.add("_active")
                    }
                    else {
                        item.classList.remove("_active")
                    }
                })

                // скролл к контейнеру с товарами
                let targetBlock = document.querySelector(el.getAttribute("href"))
                let offsetTop = offset(targetBlock).top;

                if (targetBlock) {

                    window.scroll({
                        'top': offsetTop - 115,
                        'left': 0,
                        'behavior': "smooth",

                    })
                }


            })
        })
    }

}



//запрос на сервер данных о товаре
function loadProducts() {

    fetch('https://barovskiy777.github.io/site/catalog.json')
        .then(r => r.json())
        .then(r => {

            renderProducts(r)
            setStarRaitngBehavior()

        })
        .catch(function (error) {
            console.log('Request failed', error)
        });


}

// Рендер товаров
function renderProducts(obj) {
    let out = "",
        newProduct = "",
        promo = ""




    for (key in obj) {
        let id = key.substr(0, 2)


        out += `<div class="category-body__item _active" data-product-id="${id}">
                        <div class="product-card">
                            <div class="product-card__image"><img src="${obj[key].image}" alt=""></div>
                            <div class="product-card__name">${obj[key].name}</div>
                            <div class="product-card__description">${obj[key].description}</div>
                            <div class="product-card__bottom">
                                <div class="product-card__rating rating" data-rating-total="${obj[key].rating}">
                                    <div class="rating__item" data-rating-item="5"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="4"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="3"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="2"><span class="icon-star"></span></div>
                                    <div class="rating__item" data-rating-item="1"><span class="icon-star"></span></div>
                                </div>
                                <div class="product-card__cost ">
                                    <span class="product-card__cost__price _rub">${obj[key].price}</span>
                                    <span class="product-card__cost__weight">За ${obj[key].quantity}${obj[key].measurement}.</span>
                                </div>
                                <button class="product-card__cart btn">В корзину</button>
                            </div>
                        </div>
                    </div>`

        if (obj[key].new) {
            newProduct += `
            <div class="section__item swiper-slide">
                <div class="product-card">
                    <div class="product-card__image"><img src="${obj[key].image}" alt=""></div>
                    <div class="product-card__name">${obj[key].name}</div>
                    <div class="product-card__description">${obj[key].description}</div>
                    <div class="product-card__bottom">
                        <div class="product-card__rating rating" data-rating-total="${obj[key].rating}">
                            <div class="rating__item" data-rating-item="5"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="4"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="3"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="2"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="1"><span class="icon-star"></span></div>
                        </div>
                        <div class="product-card__cost ">
                            <span class="product-card__cost__price _rub">${obj[key].price}</span>
                            <span class="product-card__cost__weight">За ${obj[key].quantity}${obj[key].measurement}.</span>
                        </div>
                        <button class="product-card__cart btn">В корзину</button>
                    </div>
                </div>
            </div>`
        }

        if (obj[key].promo) {
            promo += `
            <div class="section__item swiper-slide">
                <div class="product-card">
                    <div class="product-card__image"><img src="${obj[key].image}" alt=""></div>
                    <div class="product-card__name">${obj[key].name}</div>
                    <div class="product-card__description">${obj[key].description}</div>
                    <div class="product-card__bottom">
                        <div class="product-card__rating rating" data-rating-total="${obj[key].rating}">
                            <div class="rating__item" data-rating-item="5"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="4"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="3"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="2"><span class="icon-star"></span></div>
                            <div class="rating__item" data-rating-item="1"><span class="icon-star"></span></div>
                        </div>
                        <div class="product-card__cost ">
                            <span class="product-card__cost__price _rub">${obj[key].price}</span>
                            <span class="product-card__cost__weight">За ${obj[key].quantity}${obj[key].measurement}.</span>
                        </div>
                        <button class="product-card__cart btn">В корзину</button>
                    </div>
                </div>
            </div>`
        }

    }

    let container = document.getElementById("category-body__content")
    container.innerHTML = out

    let promoContainer = document.getElementById("promo-section__wrapper")
    promoContainer.innerHTML = promo

    let newProductsContainer = document.getElementById("new-roducts-section__wrapper")
    newProductsContainer.innerHTML = newProduct


    let recommendsContainer = document.getElementById("recommends-section__wrapper")
    recommendsContainer.innerHTML = promo




}


//фильтрация категорий
function filtrCategory() {
}

// высчитываем высоту верхнего меню, чтобы при скроле учитывпть размеры
function getSumHeightMenuAndCategory(marintTop = 10) {
    let heightHeader = +document.querySelector(".header").offsetHeight
    let heightCategoryMenu = +document.querySelector(".category").offsetHeight

    return heightHeader + heightCategoryMenu + marintTop;
}

//Возращает объект с расстоянием от элемента до верха и левой стороны window
function offset(el) {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        heightElement = el.offsetHeight

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, bottom: rect.top + scrollTop + heightElement }
}

//rating функционал для звездного рейтинга
function setStarRaitngBehavior() {
    const ratingItemsList = document.querySelectorAll(".rating__item")
    const ratingItemsArray = Array.prototype.slice.call(ratingItemsList)


    ratingItemsArray.forEach(item => {
        item.addEventListener("click", () => {
            // console.log(item.parentNode);

            item.parentNode.dataset.ratingTotal = item.dataset.ratingItem
        })
    });

}





