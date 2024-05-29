function initSlides(id, transitionDelay) {
    let index = 0;

    console.log("init")

    // show a specific slide
    function showSlide(slideNumber) {

        let slides  = document.getElementById(id).getElementsByTagName("img")

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

    // transition to next slide every x seconds
    setInterval (() => showSlide(index), transitionDelay);
}

