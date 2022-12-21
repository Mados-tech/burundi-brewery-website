function handleBarButton() {
    document.querySelector('.side-menu').style.transform = "scaleX(1)";
}

function handleCloseSideMenu() {
    document.querySelector('.side-menu').style.transform = "scaleX(0)";
}

function doThisForAll(key, whatToDo) {
    if (document.querySelector(key)) {
        document.querySelectorAll(key).forEach((element) => {
            whatToDo(element);
        });
    }
}

function handleMouseOver(id) {
    doThisForAll(".contextual-menu", (element)=>{
        element.style.transform = "scaleY(1)";
    });
}





