//defining variables
const track = document.querySelector('.slideshowTrack');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.right');
const prevButton = document.querySelector('.left');
const dotsNav = document.querySelector('.slideshowNav');
const dots = Array.from(dotsNav.children);

var slideWidth = slides[0].getBoundingClientRect().width;

//arrange slides to be next to each other instead of stacked on each other

const setSlidePosition = (slide, index) => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

//function that updates the slideshow when window is resized
//basically, the slideshow works fine when you shrink the window, but would break when you made it larger than the original image because the 
//size of the image would update, but the position would not. To fix this, I've made a function which runs when the window is being resized which
//updates the proper positions and moves the slide track back to the proper position. Also, it has to remove the animation class to make the
//change instant, then the class is re-added when the user wants to go to a new image/video. I don't love this fix but it works so I'm leaving it. 

const windowSizeUpdate = () => {
  slides.forEach(setSlidePosition);
  track.classList.remove('animate');
  track.style.transform= 'translateX(-' + track.querySelector('.currentSlide').style.left + ')';
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.classList.add('animate');
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide'); 
}

const updateDots = (currentDot,  targetDot) => {
  currentDot.classList.remove('currentSlide');
  targetDot.classList.add('currentSlide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('isHidden');
    nextButton.classList.remove('isHidden');
  } else if (targetIndex === slides.length - 1){
    prevButton.classList.remove('isHidden');
    nextButton.classList.add('isHidden');
  } else {
    prevButton.classList.remove('isHidden');
    nextButton.classList.remove('isHidden');
  }
}

//when left is clicked, move slides ot the left, and so on

prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const prevDot =currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

//when right is clicked, move slides to the right

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  
  moveToSlide(track,currentSlide,nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

//when I click on the Nav Buttons, move to that slide

dotsNav.addEventListener('click', e => {
  //what button was clicked
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.currentSlide');
  const currentDot = dotsNav.querySelector('.currentSlide');
  const targetIndex = dots.findIndex(dot => dot == targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})



