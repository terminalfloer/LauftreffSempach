function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
  }

var slides = document.getElementsByClassName('slide');
var currentSlideIndex = 0;

function showSlide(index) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

// Automatischer Wechsel der Bilder alle 3 Sekunden
setInterval(nextSlide, 3000);
