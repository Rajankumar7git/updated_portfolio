/*nav open */
const nav = document.querySelector('.navbar');
const bar = document.querySelector('#open');
const closed = document.querySelector('#close');

bar.addEventListener('click', () => {
  nav.classList.add('nav_active');
});
closed.addEventListener('click', () => {
  nav.classList.remove('nav_active');
});

/*nav stikey*/

/*home text typing*/

const texts = ['Web Developer', 'Full Stack Developer'];
const typingElement = document.getElementById('typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];

  if (!isDeleting && charIndex < currentText.length) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(type, 50);
  } else if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

/*project*/
const projectsContainer = document.querySelector('.projects-container');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.slider-dots');
const cards = document.querySelectorAll('.project-card');
let currentPosition = 0;
let isDragging = false;
let startX, scrollLeft;

// Calculate visible cards based on screen width
function getVisibleCards() {
  return window.innerWidth <= 768 ? 1 : 3;
}

// Update dots based on visible cards and current position
function updateDots() {
  const visibleCards = getVisibleCards();
  const totalSlides = Math.ceil(cards.length / visibleCards);
  dotsContainer.innerHTML = '';

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-slide', i);
    if (i === Math.floor(currentPosition / visibleCards)) {
      dot.classList.add('active');
    }
    dotsContainer.appendChild(dot);
  }

  // Add click event to dots
  document.querySelectorAll('.dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      const slide = parseInt(dot.getAttribute('data-slide'));
      const visibleCards = getVisibleCards();
      currentPosition = slide * visibleCards;
      updateSlider();
    });
  });
}

// Update slider position
function updateSlider() {
  const visibleCards = getVisibleCards();
  const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
  const maxPosition = cards.length - visibleCards;
  currentPosition = Math.max(0, Math.min(currentPosition, maxPosition));
  projectsContainer.style.transform = `translateX(-${
    currentPosition * cardWidth
  }px)`;
  updateDots();
}

// Drag functionality
projectsContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = currentPosition;
  projectsContainer.style.cursor = 'grabbing';
});

projectsContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = (x - startX) / (cards[0].offsetWidth + 20); // Adjust sensitivity
  currentPosition = scrollLeft - walk;
  updateSlider();
});

projectsContainer.addEventListener('mouseup', () => {
  isDragging = false;
  projectsContainer.style.cursor = 'grab';
  const visibleCards = getVisibleCards();
  currentPosition = Math.round(currentPosition / visibleCards) * visibleCards;
  updateSlider();
});

projectsContainer.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    projectsContainer.style.cursor = 'grab';
    const visibleCards = getVisibleCards();
    currentPosition = Math.round(currentPosition / visibleCards) * visibleCards;
    updateSlider();
  }
});

// Touch support for mobile
projectsContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  scrollLeft = currentPosition;
});

projectsContainer.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX;
  const walk = (x - startX) / (cards[0].offsetWidth + 20);
  currentPosition = scrollLeft - walk;
  updateSlider();
});

projectsContainer.addEventListener('touchend', () => {
  isDragging = false;
  const visibleCards = getVisibleCards();
  currentPosition = Math.round(currentPosition / visibleCards) * visibleCards;
  updateSlider();
});

// Adjust slider on window resize
window.addEventListener('resize', () => {
  currentPosition = 0; // Reset position on resize
  updateSlider();
});

// Initial update
updateSlider();

/*go top  */
const gotop = document.querySelector('.go-top');
window.addEventListener('scroll', checkHeight);
function checkHeight() {
  if (window.scrollY > 200) {
    gotop.style.display = 'block';
  } else {
    gotop.style.display = 'none';
  }
}
gotop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
  });
});
