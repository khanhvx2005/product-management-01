//Lọc trạng thái
const buttonStatus = document.querySelector("[button-status]");

if (buttonStatus) {
    const url = new URL(window.location.href);
    buttonStatus.addEventListener("change", (e) => {
        const status = e.target.value;
        if (status) {
            url.searchParams.set("status", status)
        } else {
            url.searchParams.delete("status")
        }
        window.location.href = url.href;
    })
}
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
    const url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")

        }
        window.location.href = url.href;

    })
}
const pageCurrent = document.querySelectorAll("[page]");
if (pageCurrent.length > 0) {
    const url = new URL(window.location.href);

    pageCurrent.forEach((item) => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("page");
            console.log(page);
            if (page) {
                url.searchParams.set("page", page)
            } else {
                url.searchParams.delete("page")

            }
            window.location.href = url.href;

        })
    })
}
const buttonStatusTable = document.querySelectorAll("[button-status-table]");
const formChangeStatus = document.querySelector("[form-change-status]");
if (formChangeStatus) {
    const path = formChangeStatus.getAttribute("path");

    if (buttonStatusTable) {
        buttonStatusTable.forEach((button) => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                const status = button.getAttribute("data-status");
                let newStatus = "";
                if (status == "active") {
                    newStatus = "inactive";
                } else {
                    newStatus = "active";
                }
                const action = `${path}/${id}/${newStatus}?_method=PATCH`;
                formChangeStatus.action = action;
                formChangeStatus.submit();

            })
        })
    }
}
// thay đổi trạng thái nhiều sản phẩm
const tableCheckBox = document.querySelector(".table-checkbox");
if (tableCheckBox) {
    const inputCheckAll = tableCheckBox.querySelector("input[checkall]");
    const inputCheckId = tableCheckBox.querySelectorAll("input[name = 'id']")
    inputCheckAll.addEventListener("click", (e) => {
        const checked = e.target.checked;
        if (checked) {
            inputCheckId.forEach((input) => {
                input.checked = true;
            })
        } else {
            inputCheckId.forEach((input) => {
                input.checked = false;
            })
        }
    })
    inputCheckId.forEach((input) => {
        input.addEventListener("click", () => {
            const countInputChecked = tableCheckBox.querySelectorAll("input[name = 'id']:checked").length;
            if (countInputChecked == inputCheckId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;

            }

        })
    })

}
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        const tableCheckBox = document.querySelector(".table-checkbox");
        const inputChecked = tableCheckBox.querySelectorAll("input[name = 'id']:checked");
        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm không");
            if (!isConfirm) {
                return;
            }
        }
        if (inputChecked.length > 0) {
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            let ids = [];
            inputChecked.forEach(input => {


                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    const id = input.value;

                    ids.push(`${id}-${position}`);
                } else {
                    const id = input.value;

                    ids.push(id);
                }


            })
            inputIds.value = ids.join(",");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
        }
    })
}

// end thay đổi trạng thái nhiều sản phẩm
// xóa 1 sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDeleteItems = document.querySelector("[form-delete-items]");
if (formDeleteItems) {
    const path = formDeleteItems.getAttribute("path");
    if (buttonDelete.length > 0) {
        buttonDelete.forEach((button) => {
            button.addEventListener("click", () => {
                const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm không");
                if (!isConfirm) {
                    return;
                }
                const id = button.getAttribute("button-delete");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItems.action = action;
                formDeleteItems.submit();
            })
        })
    }
}
// end xóa 1 sản phẩm
// thong bao
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");

    })
}
// end thong bao
// priview upload image
const uploadImageInput = document.querySelector("[upload-image-input]");
const uploadImagePriview = document.querySelector("[upload-image-priview]")
if (uploadImageInput) {
    if (uploadImagePriview) {
        uploadImageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                uploadImagePriview.src = URL.createObjectURL(file);
            }

        })
    }
}
// Sắp xếp theo tiêu chí khác nhau
const sortSelect = document.querySelector("[sort-select]");
const buttonClear = document.querySelector(".btn-clear");
if (sortSelect) {
    const url = new URL(window.location.href);
    sortSelect.addEventListener("change", (e) => {

        const [sortKey, sortValue] = e.target.value.split("-");
        if (sortKey && sortValue) {
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);

        }
        window.location.href = url.href;

    })
    buttonClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if (sortKey && sortValue) {

        const stringClass = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringClass}']`)
        optionSelected.selected = true;
    }
}


