export function SelectInit(searchBtn = false, caseSensitive = true) {
    const selectBodys = document.querySelectorAll("[data-select]");
    for (let i = 0; i < selectBodys.length; i++) {
        const selectBody = selectBodys[i];
        selectBody.classList.add(`select-${i + 1}`)
        const selectBtn = selectBody.querySelector("[data-select-btn]"),
            selectInput = selectBody.querySelector("[data-select-input]"),
            selectList = selectBody.querySelector("[data-select-list]"),
            selectSearch = selectList.querySelector("[data-select-search]"),
            selectItems = selectList.querySelectorAll("[data-select-value]");

        if (searchBtn) {
            selectBtn.setAttribute("type", 'text');
            selectBtn.setAttribute("placeholder", selectBtn.value);
            selectBtn.value = '';
        }

        document.addEventListener("click", function (e) {
            const targetEl = e.target;
            if (targetEl == selectBtn) {
                if (searchBtn) {
                    if (!selectBody.classList.contains("_active"))
                        selectBody.classList.add("_active");
                }
                else {
                    selectBody.classList.toggle("_active");
                }
            }
            // Закривати при кліку в іншому місці або по другому select
            if (!targetEl.closest(`[data-select].select-${i + 1}`)) {
                CloseSelectBody(selectBody);
            }

            for (const selectItem of selectItems) {
                if (targetEl == selectItem) {
                    RemoveSelectItem(selectItems);
                    selectBtn.value = '';
                    selectBtn.value = selectItem.textContent;
                    if (selectInput) selectInput.value = selectItem.dataset.selectValue;
                    selectItem.classList.add("_checked");
                    selectBtn.focus();
                    CloseSelectBody(selectBody);
                    return;
                }
            }
        });
        let k = 0;
        document.addEventListener("keydown", function (e) {
            if (e.key === 'Tab' || e.key === "Escape") {
                CloseSelectBody(selectBody);
            }
            if (selectBtn === document.activeElement) {
                if (e.key === 'Space') {
                    selectBody.classList.toggle("_active");
                }
                if (e.key === 'Ctrl' && e.key === 'Space') {
                    console.log(1);
                }
                if (e.key === 'ArrowDown') {
                    k++;
                    if (k > selectItems.length) k = 1;
                }
                if (e.key === 'ArrowUp') {
                    if (k <= 1) k = selectItems.length;
                    else k--;
                }
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    RemoveSelectItem(selectItems);
                    selectItems[k - 1].classList.add("_checked");
                    selectBtn.value = selectItems[k - 1].textContent;
                    if (selectInput) selectInput.value = selectItems[k - 1].dataset.selectValue;
                }
            }
        });
        document.addEventListener("keyup", function (e) {
            if (selectBtn === document.activeElement || selectSearch === document.activeElement) {
                if (!(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Ctrl' || e.key === 'Space' || e.key === 'Tab' || e.key === "Escape"))
                    SearchItems(searchBtn, selectList, selectBtn, selectItems, selectSearch, caseSensitive);
            }
        });
    }
}

function CloseSelectBody(obj) {
    if (obj.classList.contains("_active")) {
        obj.classList.remove("_active");
    }
}
function RemoveSelectItem(obj) {
    for (const selectItem of obj) {
        if (selectItem.classList.contains("_checked")) {
            selectItem.classList.remove("_checked")
            break;
        }
    }
}

function SearchItems(searchBtn = false, list, selecthBtn, items, selectSearch, caseSensitive = true) {
    let searchString;
    if (searchBtn) {
        searchString = selecthBtn.value;
        search();
    }
    else if (selectSearch) {
        searchString = selectSearch.value;
        search();
        list.prepend(selectSearch);
        selectSearch.focus();
    }

    function search(){
        list.innerHTML = '';
        if (caseSensitive) searchString = searchString.toLowerCase();

        let isOnlySpace = !searchString.replace(/\s/g, '').length;
        if (searchString.value === "" || isOnlySpace) {
            items.forEach(item => {
                list.append(item);
            });
        }
        items.forEach(item => {
            let itemString = item.textContent;
            if (caseSensitive) itemString = itemString.toLowerCase();
            let isFoundItem = (itemString.search(searchString) != -1)
            if (isFoundItem) {
                list.append(item);
            }
        }); 
    }
}