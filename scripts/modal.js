/*
    Диалоговок окно создается через тэг dialog с атрибутом data-modal-name
    Элементы открытия диалоговых окон задаются с атрибутом data-modal-target
    Элементам закрывающим диалоговое окно задаем атрибут data-modal-close

    Диалоговые окна подгружаются из отдельного файла
*/

// Атрибуты элементов
let dialogAttribute = 'data-modal-name'
let buttonAttribute = 'data-modal-target'
let closeAttribute = 'data-modal-close'
let videoAttribute = 'data-video-src'

let data
var buttons = document.querySelectorAll('[' + buttonAttribute + ']')
let filePath = 'modals.html'


fetchModals()
async function fetchModals () {
    const response = await fetch(filePath)
    data = await response.text()
    createDialog('fortune')
}


buttons.forEach( button => {
    button.addEventListener( 'click', event => {
        event.preventDefault()
        target = button.getAttribute(buttonAttribute)
        video = button.getAttribute(videoAttribute)
        createDialog(target)
    })
})


const createDialog = (target, video = null) => {

    // Закрываем другие открытые попапы
    openedDialogs = document.querySelectorAll('[' + dialogAttribute + ']')
    openedDialogs.forEach( dialog => {
        dialog.remove()
    })

    // Парсим текст из файла в DOM
    const parser = new DOMParser()
    html = parser.parseFromString(data, 'text/html')

    // Находим диалоговое окно и его ссылки закрытия
    // Если в кнопке есть ссылка на видео, копируем ее и вставляем в iframe
    dialog = html.querySelector('[' + dialogAttribute + '=' + target + ']')
    links = dialog.querySelectorAll('[' + closeAttribute + ']')
    iframe = dialog.querySelector('iframe')
    video && dialog.querySelector('iframe').setAttribute('src', video)

    // Вставляем диалоговое окно в DOM и открываем его
    document.body.append(dialog)
    dialog.showModal()

    // Релоадим необходимые срипты
    scripts = document.querySelectorAll('script[data-reload]')
    scripts.forEach(script => {
        script.remove()

        var element = document.createElement('script')
            element.setAttribute('defer', '')
            element.src = script.getAttribute('src')
            element.setAttribute('data-reload', '')
        
        document.querySelector('head').appendChild(element)
        
    })

    // При клике по ссылкам удаляем диалоговое окно
    // При клике по бэкдропу удаляем диалоговое окно
    links.forEach(link => {
        link.addEventListener('click', event => {
            dialog.remove()
        })
    })

    dialog.addEventListener('click', element => {
        if(element.target === dialog) {
            dialog.remove()
        }
    })

}

// Добавляем в CSS переменную значение ширины скроллбара
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px")