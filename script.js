gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("video");
const header = document.querySelector(".header");
const track = document.querySelector(".slider-track");
const cards = gsap.utils.toArray(".slide-card");

// 1. VIDEO CONTROL
video.addEventListener("loadedmetadata", () => {
  gsap.to(video, {
    currentTime: video.duration,
    scrollTrigger: {
      trigger: ".video-section",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });
});

// 2. INFINITE LOOP LOGIC
// Duplicate cards for seamless looping
const loopContent = track.innerHTML;
track.innerHTML += loopContent; // Now we have 18 cards

let xPos = 0;
let speed = 0;

// Mouse Movement Effect
window.addEventListener("mousemove", (e) => {
  // Calculate mouse position relative to center of screen
  // If mouse is left of center, speed is negative (move left)
  // If mouse is right of center, speed is positive (move right)
  const center = window.innerWidth / 2;
  speed = (e.clientX - center) * 0.05; 
});

function animate() {
  xPos -= speed;

  // Reset position for infinite loop effect
  // Once we've moved half the track's width, jump back to start
  const halfWidth = track.scrollWidth / 2;
  if (xPos > 0) xPos = -halfWidth;
  if (xPos < -halfWidth) xPos = 0;

  gsap.set(track, { x: xPos });
  requestAnimationFrame(animate);
}

animate();

// 3. HEADER TOGGLE & KEYBOARD
ScrollTrigger.create({
  trigger: "#about",
  start: "top 10%",
  onEnter: () => header.classList.add("visible"),
  onLeaveBack: () => header.classList.remove("visible"),
});

let downCount = 0;
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    downCount++;
    if (downCount >= 25) header.classList.add("visible");
  }
});