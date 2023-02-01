export function MoveToInit(defaultPlace = "last", defaultBreackpoint = '767', defaultMediaType = "max") {
    const objsMoveTo = document.querySelectorAll("[data-moveto]");
    let startPositions = [],
        movetoArrayObjs = [],
        movetoMatchMedias = [];
    if (objsMoveTo.length > 0) {
        // Заповнюємо масиви 
        let numberMovetoArray = 0;
        for (let index = 0; index < objsMoveTo.length; index++) {
            const objMoveTo = objsMoveTo[index];
            if (objMoveTo.getAttribute("data-moveto").length > 0) {
                let dataMovetoArray = objMoveTo.getAttribute("data-moveto").split(',');
                // масив початкових позицій
                objMoveTo.setAttribute('data-moveto-index', numberMovetoArray)
                startPositions[numberMovetoArray] = {
                    parent: objMoveTo.parentNode,
                    placeOrder: Array.prototype.indexOf.call(objMoveTo.parentElement.children, objMoveTo)
                }
                // масив елементів з даними
                let movetoElement = {
                    element: objMoveTo,
                    dest: document.querySelector('.' + dataMovetoArray[0].trim()),
                    placeOrder: dataMovetoArray[1] != undefined ? dataMovetoArray[1].trim() : defaultPlace,
                    breakpoint: dataMovetoArray[2] != undefined ? dataMovetoArray[2].trim() : defaultBreackpoint,
                    mediaType: dataMovetoArray[3] != undefined ? dataMovetoArray[3].trim() : defaultMediaType,
                }

                movetoArrayObjs.push(movetoElement);
                numberMovetoArray++;
            }
        }
        // Створюємо подію в точці breakpoint
        for (let index = 0; index < movetoArrayObjs.length; index++) {
            const movetoEl = movetoArrayObjs[index],
                movetoBreakpoint = movetoEl.breakpoint,
                movetoMediaType = movetoEl.mediaType;
            movetoMatchMedias.push(window.matchMedia(`(${movetoMediaType}-width: ${movetoBreakpoint}px)`));
            movetoMatchMedias[index].addEventListener('change', DoMoveTo);
        }
    }
    // Переміщення
    function DoMoveTo(e) {
        for (let index = 0; index < movetoArrayObjs.length; index++) {
            const el = movetoArrayObjs[index],
                mt_element = el.element,
                mt_dest = el.dest,
                mt_placeOrder = el.placeOrder,
                mt_breakpoint = el.breakpoint,
                mt_className = "_moved-to_" + mt_breakpoint;

            if (movetoMatchMedias[index].matches) {
                if (!mt_element.classList.contains(mt_className)) {
                    let placeInDest;
                    if (mt_placeOrder == 'first') {
                        placeInDest = indexsArray(mt_dest)[0];
                    }
                    else if (mt_placeOrder == 'last') {
                        placeInDest = indexsArray(mt_dest)[indexsArray(mt_dest).length];
                    }
                    else {
                        placeInDest = indexsArray(mt_dest)[mt_placeOrder];
                    }
                    mt_dest.insertBefore(mt_element, mt_dest.children[placeInDest]);
                    mt_element.classList.add(mt_className);
                }
            } else {
                if (mt_element.classList.contains(mt_className)) {
                    MoveBack(mt_element);
                    mt_element.classList.remove(mt_className);
                }
            }
        }
    }
    // Масив індексів едементів в Node, куди переноситься елемент
    function indexsArray(parent, back) {
        const children = parent.children,
            childrenArrayIndexs = [];
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (back) {
                childrenArrayIndexs.push(i);
            }
            else {
                if (element.getAttribute('data-moveto') == null) {
                    childrenArrayIndexs.push(i);
                }
            }
        }
        return childrenArrayIndexs;
    }
    // Переміщення до корінний Node
    function MoveBack(el) {
        const index = el.getAttribute('data-moveto-index');
        const startPosition = startPositions[index],
            startPosition_parent = startPosition.parent,
            startPosition_place = startPosition.placeOrder;
        startPosition_parent.insertBefore(el, startPosition_parent.children[startPosition_place]);
    }
    // Запуск переміщення при завантаженні сторінки
    DoMoveTo();
}