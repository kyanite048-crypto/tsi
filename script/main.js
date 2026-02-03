// Audio autoplay fix for Vercel/browser restrictions
document.addEventListener("click", function () {
  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.play().catch(() => {});
  }
}, { once: true });

// trigger to play music in the background with sweetalert
window.addEventListener("load", () => {
  Swal.fire({
    title: "Do you want to play music in the background?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song").play();
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

// Mischievous No button behavior - moves away when hovered or clicked
function setupNoButton() {
  const noBtn = document.getElementById('noBtn');
  if (!noBtn) return;
  
  const moveNoButton = (e) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random new position within viewport
    const maxX = viewportWidth - btnRect.width - 40;
    const maxY = viewportHeight - btnRect.height - 40;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    const randomRotate = Math.random() * 30 - 15;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = `rotate(${randomRotate}deg)`;
    noBtn.classList.add('running-away');
    
    // Play a sound effect or show tooltip
    const messages = [
      "Too slow! 😜",
      "Nice try! 😄",
      "Can't catch me! 😂",
      "Try again! 🎯",
      "Almost! 🙃"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    // Show tooltip briefly
    noBtn.setAttribute('data-tooltip', randomMsg);
    setTimeout(() => {
      noBtn.removeAttribute('data-tooltip');
    }, 1000);
  };
  
  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('click', moveNoButton);
}

// Direct redirect function for Yes button
function goToCeremony() {
  localStorage.setItem('cameFromIntro', 'true');
  confettiEffect();
  window.location.href = '/ceremony/';
}

// Yes button - navigate to ceremony with celebration
function setupYesButton() {
  const yesBtn = document.getElementById('yesBtn');
  if (!yesBtn) return;
  
  yesBtn.addEventListener('click', () => {
    goToCeremony();
  });
}

// Confetti effect for celebration
function confettiEffect() {
  const confettiContainer = document.getElementById('confettiContainer');
  if (!confettiContainer) return;
  
  confettiContainer.style.display = 'block';
  
  // Add more confetti elements dynamically
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confettiContainer.appendChild(confetti);
  }
  
  // Remove after animation
  setTimeout(() => {
    confettiContainer.innerHTML = '';
    confettiContainer.style.display = 'none';
  }, 5000);
}

// Show final page interactive elements (right after birthday wish page)
function showFinalPage() {
  const finalContent = document.getElementById('finalPageContent');
  if (finalContent) {
    finalContent.style.display = 'block';
    finalContent.style.opacity = '0';
    finalContent.style.transition = 'opacity 0.5s ease';
    
    // Stagger the animations
    setTimeout(() => {
      finalContent.style.opacity = '1';
    }, 100);
  }
  
  // Setup buttons
  setupYesButton();
  setupNoButton();
}

// animation timeline
const animationTimeline = () => {
  // Get viewport dimensions for responsive animations
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth <= 420;
  const isTablet = viewportWidth > 420 && viewportWidth <= 768;
  const isLandscapeMobile = viewportHeight <= 500 && viewportWidth > viewportHeight;
  
  // Responsive animation values
  const balloonEndY = isMobile ? -800 : (isTablet ? -900 : -1000);
  const balloonStartY = isMobile ? 1000 : (isTablet ? 1200 : 1400);
  const profileScale = isMobile ? 2.5 : (isTablet ? 3 : 3.5);
  const hatY = isMobile ? 200 : (isTablet ? 275 : 350);
  const idea6Scale = isMobile ? 2 : (isTablet ? 2.5 : 3);
  
  // split chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // timeline
  const tl = new TimelineMax();

  // Show final page right after the birthday wish page (page 5/six)
  tl.eventCallback("onComplete", function() {
    showFinalPage();
  });

  tl.to(".container", 0.6, {
    visibility: "visible",
  })
    // Page 1: Name + Greeting
    .from(".one", 0.9, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.9, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    // Page 2: Day + Age
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3"
    )
    // Page 3: Message typing animation
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      1.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(
      ".fake-btn",
      0.1,
      {
        backgroundColor: "rgb(127, 206, 248)",
      },
      "+=4"
    )
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=1"
    )
    // Page 4: Special moments
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=1.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: idea6Scale,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1.5"
    )
    // Page 5: Birthday wishes - SHOW FINAL PAGE RIGHT AFTER THIS
    .staggerFromTo(
      ".baloons img",
      isMobile ? 2 : 2.5,
      {
        opacity: 0.9,
        y: balloonStartY,
      },
      {
        opacity: 1,
        y: balloonEndY,
      },
      isMobile ? 0.15 : 0.2
    )
    .from(
      ".profile-picture",
      0.5,
      {
        scale: profileScale,
        opacity: 0,
        x: isMobile ? 15 : 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: isMobile ? -60 : -100,
      y: hatY,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    // Show final page with Yes/No right after birthday wish page
    .call(showFinalPage, null, "+=6")
    // Balloons continue in background
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    }, "-=0.5");
};
