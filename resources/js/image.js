let collection = document.getElementsByTagName("img");

const SOURCE = "https://image-resizer.simonpforster.com/oliviazuo-portfolio"

function updateImageSrc(image, blur = false) {
    let fix = image.getAttribute("fix");
    let path = image.getAttribute("path");

    if (path != null) {
        let url = SOURCE + path;
        if (fix != null) {
            switch (fix.toLowerCase()) {
                case 'width':
                    let width = blur ? 4 : parseInt(window.getComputedStyle(image.parentElement).width) * 2;
                    url += "?width=" + width;
                    break;
                case 'height':
                    let height = blur ? 4 : parseInt(window.getComputedStyle(image.parentElement).height) * 2;
                    url += "?height=" + height;
                    break;
                default:
                    break;
            }
        }
        image.src = url;

        if (blur) {
            image.addEventListener("load", () => {
                image.setAttribute("loaded", "blur");
                if (checkAllBlurred()) {
                    let captions = document.getElementsByTagName("figcaption")
                    for (let i = 0; i < captions.length; i++) {
                        captions[i].style.display = "block";
                    }
                    allImages(updateImageSrc)
                }
            }, {once: true})
        } else {
            image.addEventListener("load", () => {
                image.setAttribute("loaded", "true");
            }, {once: true})
        }
    }
}

function updateImageSrcBlur(image) {
    updateImageSrc(image, true)
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
    allImages(function (image) {
        image.getAttribute("loaded") !== "blur" ? blurred = false : null;
    })
    return blurred;
}

export {
    updateImageSrc,
    checkForUpdateImageSrc
}

// Do all init stuff
document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", function () {
        allImages(updateImageSrcBlur)
    })
    : allImages(updateImageSrcBlur)

window.onload = (event) => {

    window.onresize = (event) => {
        allImages(checkForUpdateImageSrc);
    };

    window.ondeviceorientation = (event) => {
        allImages(checkForUpdateImageSrc);
    }
};

