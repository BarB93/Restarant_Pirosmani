//<--обертка console.log
function log(element) {
    console.log(element)
}//-->

//<-- ############
//slideToggle на чистом JS
function toggle() {
    //<
    //toggle при клике
    // коллеция элементов при клике на который будут показанай или скрыт следующий за ним элеиент
    let $toggleElements = document.querySelectorAll('._toggle')

    if ($toggleElements) {
        for (let $el of $toggleElements) {
            $el.addEventListener('click',
                function (event) {
                    event.preventDefault();
                    //добавляем класс _active переключателю
                    this.classList.toggle("_active")
                    let $toggleContent = this.nextElementSibling;


                    if (!$toggleContent.classList.contains('_active')) {
                        $toggleContent.classList.add('_active');
                        $toggleContent.style.height = 'auto';

                        var height = $toggleContent.clientHeight + 'px';

                        $toggleContent.style.height = '0px';

                        setTimeout(function () {
                            $toggleContent.style.height = height;
                        }, 0);
                    } else {
                        $toggleContent.style.height = '0px';

                        $toggleContent.addEventListener('transitionend',
                            function () {
                                $toggleContent.classList.remove('_active');
                            }, {
                            once: true
                        });
                    }
                });

        }
    }//>

    // <
    //Toggle при наведении
    //коллекция элементов при наведение нведении на которой становится видным ._toggle-hover-content
    let $hoverToggleElements = document.querySelectorAll('._toggle-hover')

    if ($hoverToggleElements) {
        for (let $el of $hoverToggleElements) {
            let $toggleContent = $el.querySelector("._toggle-content")


            $el.addEventListener('mouseenter', function (event) {
                event.preventDefault();
                //добавляем класс _active переключателю
                $toggleContent.classList.add('_active');
                $toggleContent.style.height = 'auto';

                var height = $toggleContent.clientHeight + 'px';

                $toggleContent.style.height = '0px';

                setTimeout(function () {
                    $toggleContent.style.height = height;
                }, 0);

            })

            $el.addEventListener("mouseleave", function (e) {
                $toggleContent.style.height = '0px';
                $toggleContent.style.padding = '0px 20px 0px 20px;';


                setTimeout(() => {
                    $toggleContent.classList.remove('_active');
                }, 250);
            })
        }

    }//>

    //коллекция элементом при нажатии на которой будет скрыт toggle-content
    let $toggleCloseElements = document.querySelectorAll("._toggle-close")

    if ($toggleCloseElements) {
        Array.prototype.forEach.call($toggleCloseElements, ($item) => {
            let $toggleContent = $item.closest("._toggle-content")


            $item.addEventListener("click", function (e) {
                if (window.innerWidth > 870) {
                    $toggleContent.style.height = '0px';
                    $toggleContent.style.padding = '0px 20px 0px 20px;';
                } else {
                    menu.classList.remove("_active")
                    // удаляем класс _active у .menu__link__wrapper
                    $item.closest(".menu__link").querySelector(".menu__link__wrapper").classList.remove("_active")

                }


                setTimeout(() => {
                    $toggleContent.classList.remove('_active');
                }, 250);
            })
        })
    }

}// #### -->











