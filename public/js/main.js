$(window).on('resize', function() {
    if (window.innerWidth > 767) $('.collapse').collapse('hide');
});


var navbarButton = document.getElementById("navbar-button");
navbarButton.addEventListener("click", setDataTarget);

function setDataTarget() {
    console.log("in setDataTarget");
    console.log("screen.width: " + screen.width);
    console.log("screen.availWidth: " + screen.availWidth);

    var navbutton = document.getElementById("navbar-button");
    var currentDataTarget = navbutton.getAttribute("data-target");
    console.log("currentDataTarget: " + currentDataTarget);

    if (screen.availWidth < 768 && currentDataTarget !== ".my-navbar-left-xs,.my-navbar-right-xs") {
        console.log("updating for xs");
        navbutton.setAttribute("data-target", ".my-navbar-left-xs,.my-navbar-right-xs");
    }
    else if (screen.availWidth >= 768 && currentDataTarget !== ".my-navbar-left,.my-navbar-right") {
        console.log("updating to normal");
        navbutton.setAttribute("data-target", ".my-navbar-left,.my-navbar-right");
    }
}