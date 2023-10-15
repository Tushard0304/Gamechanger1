// import LocomotiveScroll from 'locomotive-scroll';
var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnimation() {
    var tl = gsap.timeline()

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            stagger: .2
        })
        .from("#heroFooter", {
            y: "-10",
            ease: Expo.easeInOut,
            opacity: 0,
            delay: -1,
            duration: 1.5,
        })


}



function circleShapeAdjust() {
    var xscale = 1
    var yscale = 1

    var xprev = 0
    var yprev = 0
    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout)

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY

        mouseMovefollower(xscale, yscale)

        setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1,1)`
        }, 100);
    })
}


function mouseMovefollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale})`

    })
}


circleShapeAdjust()
mouseMovefollower()
firstPageAnimation()






document.querySelectorAll(".element").forEach(function (element) {

    var rotation = 0;
    var diffRotation = 0;

    element.addEventListener("mouseleave", function (dets) {
        gsap.to(element.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });

    element.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - element.getBoundingClientRect().top;
        diffRotation = dets.clientX - rotation;
        rotation = dets.clientX;
        gsap.to(element.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotation: gsap.utils.clamp(-20, 20, diffRotation)
        });
    });
});