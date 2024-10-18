function initSlides(id, transitionDelay, widthFix = true) {
    let index = 0;

    console.log("init: " + id)

    let gallery = document.getElementById(id);
    let slides  = gallery.getElementsByTagName("img");

    function sizeFrameWidth() {
        let maxHeight = 0;
        let galleryWidth = parseInt(window.getComputedStyle(gallery).width,10);
        for (let i = 0; i < slides.length; i++) {
            let height = Math.floor(slides[i].naturalHeight / slides[i].naturalWidth * galleryWidth);
            maxHeight = height > maxHeight ? height : maxHeight;
        }
        gallery.style.height = maxHeight + "px";
    }

    function sizeFrameHeight() {
        let minHeight = 20000;
        let galleryWidth = parseInt(window.getComputedStyle(gallery).width,10);
        for (let i = 0; i < slides.length; i++) {
            let height = Math.floor(slides[i].naturalHeight / slides[i].naturalWidth * galleryWidth);
            minHeight = height < minHeight ? height : minHeight;
        }
        gallery.style.height = minHeight + "px";
    }


    // show a specific slide
    function showSlide(slideNumber) {
        widthFix ? sizeFrameWidth() : sizeFrameHeight();

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = i === slideNumber ? "block" : "none";
        }

        // next index
        index++;
        // go back to 0 if at the end of slides
        if (index >= slides.length) { index = 0; } else {
            slides[index].loading = "eager";
        }
    }

    onresize = (event) => {
        widthFix ? sizeFrameWidth() : sizeFrameHeight();
    };

    setInterval (() => showSlide(index), transitionDelay);
}

