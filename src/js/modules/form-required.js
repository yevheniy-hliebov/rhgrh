export function FormRequiredInit() {
    const reqForms = document.querySelectorAll('[data-form-req]');
    if (reqForms.length > 0) {
        for (let index = 0; index < reqForms.length; index++) {
            const reqForm = reqForms[index],
                reqElements = reqForm.querySelectorAll('[data-required]'),
                btnSubmit = reqForm.querySelector('[type="submit"]');
            if (reqElements.length > 0) {
                if (btnSubmit) {
                    btnSubmit.addEventListener("click", function (e) {
                        let countErrors = 0;
                        for (let i = 0; i < reqElements.length; i++) {
                            const reqElement = reqElements[i],
                                elForSetErrorClass =
                                    (reqElement.hasAttribute('data-req-error-for') && reqElement.getAttribute('data-req-error-for') != '' && document.querySelector('.' + reqElement.getAttribute('data-req-error-for')))
                                        ? document.querySelector('.' + reqElement.getAttribute('data-req-error-for'))
                                        : reqElement;
                            if (reqElement.getAttribute('data-required') == 'email') {
                                countErrors += AddClassError(elForSetErrorClass, ValidateEmail(reqElement.value));
                            } else if (reqElement.getAttribute('data-required') == 'phone-number') {
                                countErrors += AddClassError(reqElement, ValidatePhoneNum(reqElement.value));
                            } else if (reqElement.getAttribute('data-required') == '') {
                                if (reqElement.getAttribute('type') == 'checkbox') {
                                    countErrors += AddClassError(elForSetErrorClass, reqElement.checked);
                                } else {
                                    countErrors += AddClassError(elForSetErrorClass, reqElement.value != '');
                                }
                            }
                        }
                        if (countErrors > 0) {
                            if (reqForm.getAttribute('data-form-req') == 'getClassError') {
                                if (!reqForm.classList.contains('error')) {
                                    reqForm.classList.add('error');
                                }
                            }
                            e.preventDefault();
                        } else {
                            if (reqForm.getAttribute('data-form-req') == 'getClassError') {
                                if (reqForm.classList.contains('error')) {
                                    reqForm.classList.remove('error');
                                }
                            }
                        }
                    });
                }
            }
        }
    }
    function ValidateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    function ValidatePhoneNum(phoneNumber) {
        return phoneNumber.match(
            // /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        );
    }
    function AddClassError(elForSetErrorClass, condition = true) {
        let error = false;
        if (condition) {
            if (elForSetErrorClass.classList.contains('error')) {
                elForSetErrorClass.classList.remove('error')
            }
        } else {
            if (!elForSetErrorClass.classList.contains('error')) {
                elForSetErrorClass.classList.add('error')
            }
            error = true;
        }
        return error ? 1 : 0;
    }
}