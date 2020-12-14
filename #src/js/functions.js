//обертка console.log
function log(element) {
    console.log(element)
}
// slideToggle на чистом JS, при клике
let toggleArray = document.getElementsByClassName('_toggle')
if (toggleArray) {
    for (let el of toggleArray) {
        el.addEventListener('click',
            function (event) {
                event.preventDefault();
                //добавляем класс _active переключателю
                this.classList.toggle("_active")
                let toggleContent = this.nextElementSibling;


                if (!toggleContent.classList.contains('_active')) {
                    toggleContent.classList.add('_active');
                    toggleContent.style.height = 'auto';

                    var height = toggleContent.clientHeight + 'px';

                    toggleContent.style.height = '0px';

                    setTimeout(function () {
                        toggleContent.style.height = height;
                    }, 0);
                } else {
                    toggleContent.style.height = '0px';

                    toggleContent.addEventListener('transitionend',
                        function () {
                            toggleContent.classList.remove('_active');
                        }, {
                        once: true
                    });
                }
            });

    }
}
// ###

// slideToggle на чистом JS, при наведении
let hoverToggleArray = document.getElementsByClassName('_toggle-hover')
if (hoverToggleArray) {
    for (let el of hoverToggleArray) {
        let toggleContent = el.querySelector("._toggle-hover-content")

        el.addEventListener('mouseenter', function (event) {
            event.preventDefault();
            //добавляем класс _active переключателю
            toggleContent.classList.add('_active');
            toggleContent.style.height = 'auto';

            var height = toggleContent.clientHeight + 'px';

            toggleContent.style.height = '0px';

            setTimeout(function () {
                toggleContent.style.height = height;
            }, 0);

        })

        el.addEventListener("mouseleave", function (e) {
            toggleContent.style.height = '0px';
            toggleContent.style.padding = '0px 20px 0px 20px;';


            setTimeout(() => {
                toggleContent.classList.remove('_active');
            }, 250);
        })
    }

}
// ###


// ###






