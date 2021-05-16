export function onClick(element, action) {
    element.addEventListener("click", (event) => {
        event.preventDefault()
        action(event)
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

export let copyHelper = (name = "copy-helper") => {
    return {
        inject: () => `<input type="text" id="${name}" style="position: absolute; left: -100vw">`,
        copy: (text) => {
            console.log("Copy requested for #" + name);
            const injected = document.getElementById(name);

            injected.value = text;
            injected.select();
            document.execCommand("copy");
            injected.value = "";
        },
    }
}
