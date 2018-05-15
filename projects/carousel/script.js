(function() {
    var timeoutID;
    var kitties = document.getElementsByClassName("kitty");
    var nav = document.getElementsByTagName("label");
    // TODO:  that no photo is moved while in TRANSITION  var inTrans = false;

    var current = 0;
    var next = 1;

    // N A V I G A T I O N
    nav = Array.prototype.slice.call(nav);
    nav.forEach(function(n, index) {
        n.addEventListener("click", function() {
            clearNavigation(nav);
            n.classList.add("clicked");
            clearTimeout(timeoutID);
            next = index;
            moveKitties();
        });
    });

    timeoutID = setTimeout(moveKitties, 4000);

    function moveKitties() {
        kitties[current].addEventListener("transitionend", function theEnd(e) {
            e.target.classList.remove("offscreen");
            e.target.removeEventListener("transitionend", theEnd);
        });

        kitties[next].classList.add("onscreen");
        kitties[current].classList.replace("onscreen", "offscreen");

        nav[next].classList.add("clicked");
        nav[current].classList.remove("clicked");

        current = next;
        next++;
        if (next >= kitties.length) {
            next = 0;
        }
        // saving timeout ID as we need to cancel it the momen the user clicks on some nav
        timeoutID = setTimeout(moveKitties, 4000);
    }

    function clearNavigation(nav) {
        for (var i = 0; i < nav.length; i++) {
            if (nav[i].classList.contains("clicked")) {
                nav[i].classList.remove("clicked");
            }
        }
    }
})();
