export function BurgerMenuInit(burgerClass = "icon-burger", openElClass = "header__menu-wrapper") {
    const openElement = document.querySelector(`.${openElClass}`);

    document.addEventListener("click", function (e) {
        const targetEl = e.target;
        if (targetEl.closest(`.${burgerClass}`)) {
            const burgerBtn = targetEl;
            burgerBtn.classList.toggle(`${burgerClass}_active`);
            if (!document.body.classList.contains('lock')) document.body.classList.add('lock');
            if (openElement) openElement.classList.toggle(`${openElClass}_active`);
            if (!burgerBtn.classList.contains(`${burgerClass}_active`)) {
                burgerBtn.classList.toggle(`${burgerClass}_not-active`);
                if (document.body.classList.contains('lock')) {
                    document.body.classList.remove('lock');
                }
            } else if (burgerBtn.classList.contains(`${burgerClass}_not-active`)) {
                burgerBtn.classList.remove(`${burgerClass}_not-active`);
            }
        }
        // if (!targetEl.closest(`.${burgerClass}`)){
        //     if (burgerBtn.classList.contains(`${burgerClass}_active`)){
        //         burgerBtn.classList.remove(`${burgerClass}_active`);
        //         burgerBtn.classList.toggle(`${burgerClass}_not-active`);
        //     }
        // }
    });
}