// Cursor Animation (Smooth Follow)
const crsr = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const delay = 0.1; // smaller = faster follow

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX + 20; // 20px offset
  mouseY = e.clientY + 20; // 20px offset
});

function animateCursor() {
  // Gradually move current position towards mouse position
  currentX += (mouseX - currentX) * delay;
  currentY += (mouseY - currentY) * delay;

  crsr.style.left = currentX + "px";
  crsr.style.top = currentY + "px";

  requestAnimationFrame(animateCursor); // Keep looping the animation
}

animateCursor(); // Initiate cursor animation

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});


// GSAP Scroll Animation (Image Frame Animation)
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("frame");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  targetIndex: 0,
  maxIndex: 82, // Maximum number of frames
};

const images = [];
let imagesLoaded = 0;

// Preloading images
function preloadImages() {
  for (let i = 0; i <= frames.maxIndex; i++) {
    const img = new Image();
    img.src = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;

    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex + 1) {
        loadImage(0); // Start with first image
        startScrollAnimation(); // Start GSAP scroll animation
        animateFrames(); // Begin frame animation loop
      }
    };

    img.onerror = () => {
      console.error("❌ Failed to load:", img.src);
    };

    images.push(img);
  }
}

// Load specific image based on index
function loadImage(index) {
  const img = images[index];
  if (!img) return;

  // Resize canvas to full window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const newWidth = img.width * scale;
  const newHeight = img.height * scale;

  const offsetX = (canvas.width - newWidth) / 2;
  const offsetY = (canvas.height - newHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
}

// Start scroll animation with GSAP
function startScrollAnimation() {
  // Scroll-triggered frame animation
  gsap.to(frames, {
    targetIndex: frames.maxIndex,
    ease: "none",
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 3, // Makes animation smooth with scroll
    }
  });

  // Fade out canvas as scroll reaches bottom
 gsap.to(canvas, {
  opacity: 0,
  scrollTrigger: {
    trigger: ".parent",
    duration: 1,
    start: "50% top",     // Adjusted start point
    end: "bottom bottom",       // Adjusted end point to extend scroll area
    scrub: true,             // Enables smooth scroll-linked animation
  }
});

}

// Animates frames at a consistent rate
function animateFrames() {
  function render() {
    frames.currentIndex += (frames.targetIndex - frames.currentIndex) * 0.03;
    // Clamp index to valid range
    const index = Math.max(0, Math.min(frames.maxIndex, Math.floor(frames.currentIndex)));
    if (images[index]) loadImage(index);
    requestAnimationFrame(render);
  }
  render();
}

// Handle window resize event (recalculate canvas size)
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  loadImage(Math.floor(frames.currentIndex)); // Redraw current frame
});

preloadImages(); // Start preloading images




gsap.to(".heading2", {
  opacity: 1,
  duration: 4, // Smooth transition
  delay: 0.3,
  scrollTrigger: {
    trigger: ".heading2",
    start: "top 90%",
    toggleActions: "play none none reverse", // Optional: reverse when scrolling back
  }
});


 function openModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.src = videoSrc;
    modal.classList.remove('hidden');
    modalVideo.play();
  }

  function closeModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.pause();
    modalVideo.src = '';
    modal.classList.add('hidden');
  }


   const categories = {
    graphic: [
      "Social Media Posts",
      "YouTube Thumbnails",
      "Song Thumbnails / Covers",
      "Mockup Presentation",
      "Instagram Stories & Ads",
      "Poster & Flyer Design",
      "Movie Posters",
      "Magazine Cover Design",
      "Digital Paintings & Illustrations",
      "Business Cards",
      "Brand Guidelines",
      "Packaging & Labels",
      "T-shirt & Merchandise",
      "Brochures & Pamphlets",
      "Letterhead Design",
    ],
    video: [
      "Reels & Shorts Editing",
      "YouTube Video Editing",
      "Gaming Highlights Editing",
      "Product Videos",
      "Explainer Animations",
      "Logo Animation",
      "Intro/Outro Design",
      "Music Video Editing",
      "Corporate Videos",
      "Event Highlights",
      "Text & Infographic Animation",
      "Streaming/Live Stream Highlights",
      "Montage Videos (Gaming/Creative)",
      "Vlogs & Mini Vlogs",
      "Behind-the-Scenes (BTS) Videos",
    ],
  };

  function showCategory(catKey) {
    const container = document.getElementById('subcategoryContainer');
    container.innerHTML = ''; // clear existing

    categories[catKey].forEach((item) => {
      const card = document.createElement('div');
      card.className = 'border rounded-lg p-4 bg-white shadow hover:shadow-md cursor-default text-center';
      card.textContent = item;
      container.appendChild(card);
    });
  }






  const cards = document.querySelectorAll('#video-services > div');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let visibleCards = 8;

  // Show first 8 cards initially
  for (let i = 0; i < visibleCards; i++) {
    if (cards[i]) cards[i].classList.remove('hidden');
  }



  