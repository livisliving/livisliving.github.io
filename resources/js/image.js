let collection = document.getElementsByTagName("img");

const SOURCE = "https://image-resizer.simonpforster.com/oliviazuo-portfolio"

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

function initAllImageSrc() {
    for (let i = 0; i < collection.length; i++) {
        updateImageSrc(collection[i]);
    }
}

function updateAllImageSrc() {
    for (let i = 0; i < collection.length; i++) {
        let ratioWidth = collection[i].naturalWidth / parseInt(window.getComputedStyle(collection[i]).width)
        let ratioHeight = collection[i].naturalHeight / parseInt(window.getComputedStyle(collection[i]).height)
        if ((ratioWidth < 1.5 && ratioHeight !== 0 && !isNaN(ratioHeight))
            || (ratioWidth < 1.5 && ratioWidth !== 0 && !isNaN(ratioWidth))) {
            console.info("requesting a higher resolution image");
            updateImageSrc(collection[i]);
        }
    }
}

window.onload = (event) => {
    initAllImageSrc()

    window.onresize = (event) => {
        updateAllImageSrc()
    };

    window.ondeviceorientation = () => {
        updateAllImageSrc()
    }
};

