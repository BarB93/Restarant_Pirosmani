// <-- ############## PAGINATION 
function puginationProducts(productId = -1) {
    const productsOnPage = 8
    const products = productId === -1 ? document.querySelectorAll("._pagination-item") : document.querySelectorAll(`._pagination-item[data-product-id='${productId}']`)
    const quantityPages = Math.ceil(products.length / productsOnPage)
    const buttonsContainer = document.querySelector("._pagination-buttons")



    if (products.length > productsOnPage) {
        renderProductsPagination()
        renderButtonsPagination()
        addClickToControlsPagination()

    }
    else buttonsContainer.innerHTML = ""

    // рендер страниц пагинации
    function renderProductsPagination(startIndex = 0) {
        const container = document.querySelector('._pagination-container')
        const productsPagination = Array.from(products).slice(+startIndex, +startIndex + productsOnPage)


        container.innerHTML = ""
        productsPagination.forEach(el => {
            container.append(...productsPagination)
        })
    }
    // рендер кнопок панинации
    function renderButtonsPagination() {


        let buttons = ""

        for (let i = 0; i < quantityPages; i++) {
            let showClass = ''
            if (i < 4) showClass = "_show"

            let buttonClass = ""
            if (i === 0) buttonClass = '_pagination-buttons__button--first _active'
            else if (i === quantityPages - 1) buttonClass = '_pagination-buttons__button--last'
            else buttonClass = '_pagination-buttons__button--extreme'
            buttons += `<button class='_pagination-buttons__button ${buttonClass} ${showClass}' data-id='${i}'>${i + 1}</button>`
        }

        buttonsContainer.innerHTML = buttons

        if (quantityPages > 5) addPaginationDots()

        addPaginationArrows()

    }
    //добавление многоточий перед первой и последней кнопкой
    function addPaginationDots() {
        const buttonsPagination = document.querySelectorAll("._pagination-buttons__button")
        let dotsStart = '<div class="_pagination-buttons__dots _pagination-buttons__dots--start"><span>...</span></div>'
        let dotsEnd = '<div class="_pagination-buttons__dots _pagination-buttons__dots--end _active"><span>...</span></div>'

        buttonsPagination[0].insertAdjacentHTML('afterend', dotsStart)
        buttonsPagination[quantityPages - 1].insertAdjacentHTML('beforebegin', dotsEnd)


    }
    //показ-скрытие многоточий перед первой и последней кнопкой
    function addDotsBehavior() {
        if (quantityPages > 5) {
            let currentActiveButton = document.querySelector("._pagination-buttons__button._active"),
                currentActiveButtonId = currentActiveButton.dataset.id,
                dotsStart = document.querySelector('._pagination-buttons__dots--start'),
                dotsEnd = document.querySelector('._pagination-buttons__dots--end')

            if (currentActiveButtonId < 4) dotsStart.classList.remove('_active')
            else dotsStart.classList.add('_active')

            if (currentActiveButtonId > quantityPages - 5) dotsEnd.classList.remove('_active')
            else dotsEnd.classList.add('_active')
        }
    }
    // добавление стрелок листания по страницам пагинации вперед-назад
    function addPaginationArrows() {
        let arrowStart = `<div class="_pagination-buttons__arrow _pagination-buttons__arrow--left" id='_pagination-buttons__arrow--left'>&#10094;</div>`
        let arrowEnd = `<div class="_pagination-buttons__arrow _pagination-buttons__arrow--right _active" id='_pagination-buttons__arrow--right'>&#10095;</div>`

        buttonsContainer.insertAdjacentHTML('afterbegin', arrowStart);
        buttonsContainer.insertAdjacentHTML('beforeend', arrowEnd);

    }
    // вызов функций вешающих события на элементы управления пагинации(кнопки и стрелки)
    function addClickToControlsPagination() {
        // события на кнопки
        addClickToButtonPagination()
        addClickToArrowPagination()
    }
    // добаление событей на кнопки пагинации
    function addClickToButtonPagination() {
        let buttonsPagination = document.querySelectorAll('._pagination-buttons__button')
        for (el of buttonsPagination) {
            el.addEventListener('click', function () {
                //рендерим товары по нажатой кнопки погинации
                renderProductsPagination(this.dataset.id * productsOnPage)
                // изменяем активную кнопку
                changeActiveButton(this.dataset.id)

                addButtonsBehavior.call(this)
                addDotsBehavior()
                scrollToCategoryTop()
                arrowsBehavior()


            })
        }
    }
    function addClickToArrowPagination() {
        const arrowPrev = document.querySelector("._pagination-buttons__arrow--left")
        const arrowNext = document.querySelector("._pagination-buttons__arrow--right")

        arrowPrev.addEventListener('click', function () {
            const activeButton = document.querySelector('._pagination-buttons__button._active')
            const activeButtonId = +activeButton.dataset.id
            changeActiveButton(activeButtonId - 1)
            addButtonsBehavior.call(document.querySelector('._pagination-buttons__button._active'))
            renderProductsPagination((activeButtonId - 1) * productsOnPage)
            arrowsBehavior()
            addDotsBehavior()
            scrollToCategoryTop()
        })
        arrowNext.addEventListener('click', function () {
            const activeButton = document.querySelector('._pagination-buttons__button._active')
            const activeButtonId = +activeButton.dataset.id
            changeActiveButton(activeButtonId + 1)
            addButtonsBehavior.call(document.querySelector('._pagination-buttons__button._active'))
            renderProductsPagination((activeButtonId + 1) * productsOnPage)
            arrowsBehavior()
            addDotsBehavior()
            scrollToCategoryTop()
        })
    }
    function arrowsBehavior() {
        const arrowPrev = document.querySelector("._pagination-buttons__arrow--left")
        const arrowNext = document.querySelector("._pagination-buttons__arrow--right")
        const activeButton = document.querySelector('._pagination-buttons__button._active')
        if (activeButton.classList.contains("_pagination-buttons__button--first")) arrowPrev.classList.remove('_active')
        else arrowPrev.classList.add('_active')

        if (activeButton.classList.contains("_pagination-buttons__button--last")) arrowNext.classList.remove('_active')
        else arrowNext.classList.add('_active')
    }

    // изменение активной кнопки(класс _active)
    function changeActiveButton(buttonId) {
        let buttonsPagination = document.querySelectorAll('._pagination-buttons__button')
        let currentButtonPagination = document.querySelector(`._pagination-buttons__button[data-id='${buttonId}']`)

        buttonsPagination.forEach((el) => {
            el.classList.remove("_active")
        })

        currentButtonPagination.classList.add("_active")
    }
    // поведение кнопок при нажатии
    function addButtonsBehavior() {

        hideButtons()
        if (this.classList.contains("_pagination-buttons__button--first")) {


            for (let i = 1; i < 4; i++) {
                const el = document.querySelector(`._pagination-buttons__button[data-id='${i}']`)

                if (el) el.classList.add('_show')
            }

        } else if (this.classList.contains("_pagination-buttons__button--last")) {
            for (let i = 1; i < 4; i++) {

                const el = document.querySelector(`._pagination-buttons__button[data-id='${quantityPages - 1 - i}']`)
                if (el) el.classList.add('_show')
            }
        } else if (this.classList.contains("_pagination-buttons__button--extreme")) {

            for (let i = 1; i <= 2; i++) {

                const nextButton = document.querySelector(`._pagination-buttons__button[data-id='${+this.dataset.id + i}']`),
                    prevButton = document.querySelector(`._pagination-buttons__button[data-id='${+this.dataset.id - i}']`)


                if (nextButton) nextButton.classList.add('_show')
                if (prevButton) prevButton.classList.add('_show')
            }
            this.classList.add("_show")
        }

    }

    // скрытие кнопок
    function hideButtons() {
        let buttonsExtremePagination = document.querySelectorAll('._pagination-buttons__button--extreme')
        for (el of buttonsExtremePagination) {
            el.classList.remove("_show")
        }
    }

    // скролл к верху елемента #category-body
    function scrollToCategoryTop() {
        let offsetPosition = document.querySelector('#category-body').getBoundingClientRect().top - getHeightFixedMenu()

        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth"
        })
    }

}
 //### --> PAGINATION  END


