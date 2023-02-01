export function PopupInit() {
    const popups = document.querySelectorAll('[data-popup]');
    const body = document.querySelector('body');

    document.addEventListener("click", function (e) {
        const targetEl = e.target;
        if (targetEl.closest('[data-popup-open]')) {
            const popupBtn = targetEl,
                popupIdName = popupBtn.getAttribute('data-popup-open');
            for (const popup of popups) {
                if (popupIdName == popup.getAttribute('data-popup')) {
                    if (!popup.classList.contains('_popup-active')) {
                        popup.classList.add('_popup-active');
                    }
                } else if (popup.classList.contains('_popup-active')) {
                    popup.classList.remove('_popup-active');
                }
            }
            if (!body.classList.contains('lock')) {
                body.classList.add('lock');
            }
        }
        else if (targetEl.closest('[data-popup-close]')) {
            const popupClose = targetEl;
            if (popupClose.hasAttribute('data-popup-close')) {
                const popupIdName = popupClose.getAttribute('data-popup-close');
                for (const popup of popups) {
                    if (popupIdName == popup.getAttribute('data-popup')) {
                        if (popup.classList.contains('_popup-active')) {
                            popup.classList.remove('_popup-active');
                        }
                        break;
                    }
                }
                if (body.classList.contains('lock')) {
                    body.classList.remove('lock');
                }
            }
        }
    });
}