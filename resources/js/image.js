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

        image.addEventListener("load", () => {
            image.setAttribute("loaded", "true");
        }, {once: true})
    }
}

function initImageBlur(image) {
    let fix = image.getAttribute("fix");
    let path = image.getAttribute("path");

    if (path != null) {
        let url = SOURCE + path;
        if (fix != null) {
            switch (fix.toLowerCase()) {
                case 'width':
                    url += "?width=" + 20;
                    break;
                case 'height':
                    url += "?height=" + 20;
                    break;
                default:
                    break;
            }
        } else {
            url += "?width=" + 20;
        }
        image.src = url;
        image.addEventListener("load", () => {
            image.setAttribute("loaded", "blur");
            checkAllBlurred() ? allImages(updateImageSrc) : null;
        }, {once: true})
    }
}

function checkForUpdateImageSrc(image) {
    let ratioWidth = image.naturalWidth / parseInt(window.getComputedStyle(image).width);
    let ratioHeight = image.naturalHeight / parseInt(window.getComputedStyle(image).height);
    if ((ratioWidth < 2 && ratioHeight !== 0 && !isNaN(ratioHeight))
        || (ratioWidth < 2 && ratioWidth !== 0 && !isNaN(ratioWidth))) {
        console.info("requesting a higher resolution image");
        updateImageSrc(image);
    }
}

function allImages(thing) {
    for (let i = 0; i < collection.length; i++) {
        thing(collection[i]);
    }
}

function checkAllBlurred() {
    let blurred = true;
    allImages( function(image) {
        image.getAttribute("loaded") !== "blur" ? blurred = false : null;
    })
    return blurred;
}

// Do all init stuff
document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded",  allImages(initImageBlur))
    : allImages(initImageBlur)

window.onload = (event) => {

    window.onresize = (event) => {
        allImages(checkForUpdateImageSrc);
    };

    window.ondeviceorientation = (event) => {
        allImages(checkForUpdateImageSrc);
    }
};

