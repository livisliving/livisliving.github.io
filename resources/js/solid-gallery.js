import {checkForUpdateImageSrc} from "./image.js";

function isLoaded(image) {
    let loadedAttribute = image.getAttribute("loaded");
    return (loadedAttribute === "blur" || loadedAttribute === "true");
}

function initSlides(id, transitionDelay, widthFix = true) {

    console.log("init: " + id)
    let gallery = document.getElementById(id);
    let slides = gallery.getElementsByTagName("img");

    slides[0].style.display = "block";
    for (let i = 1; i < slides.length; i++) {
        slides[i].style.display = "none";
    }


    function sizeFrameWidth() {
        let maxHeight = 0;
        let galleryWidth = parseInt(window.getComputedStyle(gallery).width, 10);
        for (let i = 0; i < slides.length; i++) {
            let height = Math.floor(slides[i].naturalHeight / slides[i].naturalWidth * galleryWidth);
            maxHeight = height > maxHeight ? height : maxHeight;
        }
        gallery.style.height = maxHeight + "px";
    }

    function sizeFrameHeight() {
        let minHeight = 20000;
        let galleryWidth = parseInt(window.getComputedStyle(gallery).width, 10);
        for (let i = 0; i < slides.length; i++) {
            let height = Math.floor(slides[i].naturalHeight / slides[i].naturalWidth * galleryWidth);
            minHeight = height < minHeight ? height : minHeight;
        }
        gallery.style.height = minHeight + "px";
    }

    let index = 0;

    // show a specific slide
    function showSlide(slideNumber) {
        widthFix ? sizeFrameWidth() : sizeFrameHeight();
        let check = false;
        if (index < slides.length - 1) {
            slides[index + 1].loading = "eager";
            check = isLoaded(slides[index + 1]);
        } else {
            check = isLoaded(slides[0]);
        }
        if (check) {
            if (slides[index].getAttribute("loaded") === "true") {
                checkForUpdateImageSrc(slides[index]) // todo, check against current block image in gallery
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = i === slideNumber ? "block" : "none";
            }

            // next index
            index++;
            // go back to 0 if at the end of slides
            if (index >= slides.length) {
                index = 0;
            }
        }
    }


    window.onresize = (event) => {
        widthFix ? sizeFrameWidth() : sizeFrameHeight();
    };

    window.ondeviceorientation = (event) => {
        widthFix ? sizeFrameWidth() : sizeFrameHeight();
    };

    setInterval(() => showSlide(index), transitionDelay);
}

let galleries = document.getElementsByClassName("gallery");

for (let i = 0; i < galleries.length; i++) {
    let fix = galleries[i].getAttribute("fix");
    if (fix != null) {
        if (fix === "height") {
            initSlides(galleries[i].id, 700, false);
        } else {
            initSlides(galleries[i].id, 700);
        }
    } else {
        initSlides(galleries[i].id, 700);
    }
}