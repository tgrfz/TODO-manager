export function onClick(element, action) {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        action(event);
    })
}

export function onSubmit(form, action) {
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const values = {};
        new FormData(form).forEach((value, key) => {
            values[key] = value;
        });
        action(values)
    })
}

export function onChange(element, action) {
    element.addEventListener("change", (event) =>  {
        event.preventDefault();
        action(event);
    })
}
