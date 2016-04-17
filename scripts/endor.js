(function ()
{
    "use strict";
    var slides = [];
    var active, ctr, activeToCItem;
    init();
    function keyEvents(e)
    {
        var PREV_PAGE = 33;
        var NEXT_PAGE = 34;
        var ARROW_LEFT = 37;
        var ARROW_UP = 38;
        var ARROW_RIGHT = 39;
        var ARROW_DOWN = 40;
        if (e.keyCode === ARROW_RIGHT || e.keyCode === ARROW_DOWN || e.keyCode === NEXT_PAGE)
        {
            updateSlide(Math.min(slides.length - 1, active + 1));
        }
        else if (e.keyCode === ARROW_LEFT || e.keyCode === ARROW_UP || e.keyCode === PREV_PAGE)
        {
            updateSlide(Math.max(0, active - 1));
        }
    }

    function updateSlide(slide)
    {
        location.hash = slide;
        updateToC(slide);
    }

    function updateToC(slide)
    {
        if (activeToCItem)
        {
            activeToCItem.classList.toggle('active-menu-list-item');
        }
        activeToCItem = document.getElementById('menu-list-item-' + slide);
        activeToCItem.classList.toggle('active-menu-list-item');
        scrollToCActiveItemIntoView();
    }

    function scrollToCActiveItemIntoView()
    {
        activeToCItem.scrollIntoView();
    }

    function hashChange(e)
    {
        active = checkHash(e.newURL);
        toggleOpacity();
        ctr.textContent = active + 1;
        updateSlide(active);
    }

    function load()
    {
        active = checkHash(location.toString());
        slides.forEach(function (slide)
        {
            slide.addEventListener("transitionend", toggleDisplay);
        });
        toggleOpacity();
        document.getElementById("slides_total").textContent = slides.length;
        ctr = document.getElementById("slide_counter");
        ctr.textContent = active + 1;
        updateSlide(active);
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
        document.addEventListener('DOMContentLoaded', addOverlayWithMenu);
    }

    function checkHash(url)
    {
        var hash = new URL(url).hash;
        var h = hash ? parseInt(hash.substring(1)) : 0;
        if (Number.isNaN(h) || h < 0 || h >= slides.length)
        {
            h = 0;
        }
        return h;
    }

    function toggleDisplay()
    {
        slides.forEach(function (slide, i)
        {
            slide.id = i;
            if (i === active)
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

    function toggleOpacity()
    {
        slides.forEach(function (slide, i)
        {
            slide.id = i;
            if (i === active)
            {
                slide.style.opacity = 1;
            }
            else
            {
                slide.style.opacity = 0;
                slide.style.transition = "opacity 0.5s linear";
            }
        });
    }


    function addOverlayWithMenu()
    {
        var overlay = document.createElement('nav');
        overlay.id = 'overlay';
        function openOverlayMenu()
        {
            overlay.classList.add('active-menu');
            scrollToCActiveItemIntoView();
        }

        function closeOverlayMenu()
        {
            overlay.classList.remove('active-menu');
        }

        var mask = document.createElement('div');
        mask.classList.add('menu-mask');
        mask.addEventListener('click', function ()
        {
            closeOverlayMenu();
        });
        var buttonOpenMenu = document.createElement('button');
        buttonOpenMenu.classList.add('button-open-menu');
        buttonOpenMenu.textContent = 'ToC';
        buttonOpenMenu.addEventListener('click', function ()
        {
            openOverlayMenu();
        });
        overlay.appendChild(buttonOpenMenu);
        var buttonCloseMenu = document.createElement('button');
        buttonCloseMenu.classList.add('button-close-menu');
        buttonCloseMenu.textContent = 'Close ToC';
        buttonCloseMenu.addEventListener('click', function ()
        {
            closeOverlayMenu();
        });
        overlay.appendChild(buttonCloseMenu);
        console.log("addDropDownMenu");
        var list = document.createElement('ol');
        list.classList.add('menu-list');
        overlay.appendChild(list);
        var footer = document.querySelector('footer');
        var slides = Array.prototype.slice.call(
        document.getElementsByTagName('section'));
        slides.forEach(function (slide, index)
        {
            var listItem = document.createElement('li');
            listItem.classList.add('menu-list-item');
            listItem.id = 'menu-list-item-' + (index + 1);
            var linkText = '';
            var mainHeadline = slide.querySelector('h1');
            if (mainHeadline)
            {
                linkText = mainHeadline.textContent;
                listItem.classList.add('menu-list-main-item');
            }
            else
            {
                var subHeadline = slide.querySelector('h2');
                linkText = subHeadline.textContent;
            }
            var link = document.createElement('a');
            link.classList.add('menu-link');
            link.href = '#' + (index + 1);
            link.textContent = linkText;
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
        footer.appendChild(overlay);
        footer.appendChild(mask);
    }
})();
