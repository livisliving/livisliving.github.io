let collection = document.getElementsByTagName("img");

const SOURCE = "https://image-resizer.simonpforster.com/oliviazuo-portfolio"

function updateAllImageSrc() {
    console.info("updating all image sources");
    for (let i = 0; i < collection.length; i++) {
        updateImageSrc(collection[i]);
    }
}

function updateAllImageSrcInit() {
    console.info("updating all image sources");
    for (let i = 0; i < collection.length; i++) {
        updateImageSrcInit(collection[i]);
    }
}


function updateImageSrc(image) {

    let fix = image.getAttribute("fix");
    let path = image.getAttribute("path");

    if (path != null) {
        let url = SOURCE + path;
        if (fix != null) {
            switch (fix.toLowerCase()) {
                case 'width':
                    let width = parseInt(window.getComputedStyle(image.parentElement).width) * 2;
                    url += "?width=" + width;
                    break;
                case 'height':
                    let height = parseInt(window.getComputedStyle(image.parentElement).height) * 2;
                    url += "?height=" + height;
                    break;
                default:
                    break;
            }
        }
        image.src = url;
    }
}

function updateImageSrcInit(image) {

    let path = image.getAttribute("path");

    if (path != null) {
        image.setAttribute("loading", "lazy")
        image.src = SOURCE + path + "?width=20";
    }
}

// window.onloadstart = () => {
//     console.log("onloadstart updating image source");
//     updateAllImageSrc()
// }

window.onload = () => {
    console.log("onload updating image source");
    updateAllImageSrc()
}

// window.onresize = () => {
//     console.log("onresize updating image source");
//     updateAllImageSrc()
// }

// console.log("init updating image source");
// updateAllImageSrcInit()