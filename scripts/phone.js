// ----------------------- Маска для телефона

var eventCalllback = function (event) {
    var element = event.target,
        clearVal = element.dataset.phoneClear,
        pattern = element.dataset.phonePattern,
        matrix_def = "+7 (___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = event.target.value.replace(/\D/g, "")

    if (clearVal !== 'false' && event.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            event.target.value = ''
            return
        }
    }
    
    if (def.length >= val.length) val = def
    event.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    })
}

var inputs = document.querySelectorAll('input[type=tel]')
inputs.forEach( input => {
    ['input', 'blur', 'focus'].forEach( event => {
        input.addEventListener(event, eventCalllback)
    })
})

// ----------------------- Маска для телефона