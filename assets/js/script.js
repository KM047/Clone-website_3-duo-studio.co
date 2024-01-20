function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemt/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

loco();

let cursor = document.querySelector("#cursor");
let main = document.querySelector("#main");
let p1Video = document.querySelector("#page1 video");

document.addEventListener("mousemove", function (dets) {
  // console.log(dets);

  cursor.style.left = dets.pageX + "px";
  cursor.style.top = dets.pageY + "px";
});

p1Video.addEventListener("mouseenter", function (dets) {
  cursor.style.left = dets.pageX + "px";
  cursor.style.top = dets.pageY + "px";
  cursor.style.width = "90px";
  cursor.style.borderRadius = "50px";
  cursor.innerHTML = "<h5>SOUND ON</h5>";
});

p1Video.addEventListener("mouseleave", function (dets) {
  cursor.style.width = "20px";
  cursor.textContent = "";
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    start: "top 30%",
    end: "top 0",
    scrub: 2,
    // markers : true,
  },
});

tl.to(
  "#page1 h1",
  {
    x: -100,
    // repeat : -1
  },
  "head"
);

tl.to(
  "#page1 h2",
  {
    x: 100,
    // repeat : -1
  },
  "head"
);

tl.to(
  "#page1 video",
  {
    width: "95%",
  },
  "head"
);

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    start: "top -110%",
    end: "top -120%",
    scrub: 2,
    // markers : true,
  },
});

tl2.to("#main", {
  backgroundColor: "#fff",
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    // markers: true,
    start: "top -420%",
    end: "top -430%",
    scrub: 2,
  },
});

tl3.to("#main", {
  backgroundColor: "#0F0D0D",
});

const boxes = document.querySelectorAll("#box");

boxes.forEach((box) => {
  box.addEventListener("mouseenter", function (dets) {
    let img = box.getAttribute("data-image");

    cursor.style.width = "300px";
    cursor.style.height = "250px";
    cursor.style.borderRadius = "0";
    cursor.style.backgroundImage = `url(${img})`;
    cursor.style.transition = `all ease .5s`;
  });

  box.addEventListener("mouseleave", function (dets) {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundImage = `none`;
  });
});

let h4 = document.querySelectorAll("#nav h4");
let nav = document.querySelector("#nav");
let purple = document.querySelector("#purple");

h4.forEach((h) => {
  h.addEventListener("mouseenter", (e) => {
    purple.style.display = "block";
    purple.style.opacity = "1";
  });

  nav.addEventListener("mouseleave", (e) => {
    purple.style.display = "none";
    purple.style.opacity = "0";
    
  });
});
