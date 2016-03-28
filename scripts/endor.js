(function ()
{
    "use strict";
    var slides = [];
    var active, ctr;
    init();
    function keyEvents(e)
    {
        var PREV_PAGE = 33;
        var NEXT_PAGE = 34;
        var ARROW_LEFT = 37;
        var ARROW_UP = 38;
        var ARROW_RIGHT = 39;
        var ARROW_DOWN = 40;
        if(e.keyCode === ARROW_RIGHT || e.keyCode === ARROW_DOWN || e.keyCode === NEXT_PAGE)
        {
            location.hash = Math.min(slides.length-1, active+1);
        }
        else if(e.keyCode === ARROW_LEFT || e.keyCode === ARROW_UP || e.keyCode === PREV_PAGE)
        {
            location.hash = Math.max(0, active-1);
        }
    }
    function hashChange(e)
    {
        active = checkHash(e.newURL);
        changeOpacity();
        ctr.textContent = active + 1;
        location.hash = active;
    }
    function load()
    {
        active = checkHash(location.toString());
        slides.forEach(function (slide)
        {
            slide.addEventListener("transitionend", changeDisplay);
        });
        changeOpacity();
        document.getElementById("slides_total").textContent = slides.length;
        ctr = document.getElementById("slide_counter");
        ctr.textContent = active + 1;
        location.hash = active;
    }
    function init()
    {
        slides = Array.prototype.slice.call(
            document.querySelectorAll("article > section"));
        slides.unshift(document.querySelectorAll("article > header")[0]);
        window.onload = load;
        window.onhashchange = hashChange;
        window.onkeyup = keyEvents;
        //window.onkeydown = keyEvents;
        //window.onkeypress = keyEvents;
    }
    function checkHash(url)
    {
        var hash = new URL(url).hash;
        var h = hash ? parseInt(hash.substring(1)) : 0;
        if(Number.isNaN(h) || h < 0 || h >= slides.length)
        {
            h = 0;
        }
        return h;
    }
    function changeDisplay()
    {
        slides.forEach(function (slide, i)
        {
            slide.id = i;
            if(i === active)
            {
                slide.style.display = "block";
                slide.style.removeProperty("opacity");
                slide.style.removeProperty("transition");
            }
            else
            {
                slide.style.display = "none";
            }
        });
    }
    function changeOpacity()
    {
        slides.forEach(function (slide, i)
        {
            slide.id = i;
            if(i === active)
            {
                slide.style.opacity = 1;
            }
            else
            {
                slide.style.opacity = 0;
                slide.style.transition = "opacity 1s linear";
            }
        });
    }
})();
