function isMobile(){
    const link = document.querySelector('.responsive')
    let heightScreen = window.outerHeight
    let widthScreen = window.outerWidth
    if (widthScreen/heightScreen < 0.8) {
        link.setAttribute("href", "css/responsive.css")
    }
    else {
        link.setAttribute("href", "")
    }
}

window.onload = isMobile()
window.addEventListener('resize', isMobile)
