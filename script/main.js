'use strict';





function drawGraph() {
   const canvases = document.querySelectorAll('.about__canvas');
   canvases.forEach(item => {
      const canvas = item;
      const ctx = canvas.getContext('2d');
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const radius = 100;
      const startAngle = 1.5 * Math.PI;
      const value = parseInt(canvas.previousElementSibling.innerHTML);
      const procent = value * 2 / 100;
      const endAngle = (procent + 1.5) * Math.PI;
      const counterClockwise = false;

      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#f2c351';
      ctx.stroke();

      ctx.font = "24px serif";
      ctx.fillText(`${value}%`, 105, 140)
   })
}
drawGraph();



//при скролі прозорість хедеру

const header = document.getElementById('header');

window.addEventListener('scroll', onScroll);

function onScroll() {
   if (window.pageYOffset > 0) {
      header.classList.add('active')
   }
   else if (window.pageYOffset === 0) {
      header.classList.remove('active');
   }
}


//анімаціяя при скролі

const animItems = document.querySelectorAll('.anim-items')

window.addEventListener('scroll', checkItems)

checkItems()

function checkItems() {
   const triggerBottom = window.innerHeight / 5 * 4;

   animItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top

      if (itemTop < triggerBottom) {
         item.classList.add('active')
      } else if (!item.classList.contains('anim-no-hide')) {
         item.classList.remove('active')
      }
   })
}


//слайд шоу

let position = 0;
const slidesToShow = 2;
const slidesToScroll = 1;
const slider = document.getElementById('news__slider');
const track = document.getElementById('news__track');
const btnPrev = document.getElementById('news__btn--left');
const btnNext = document.getElementById('news__btn--right');
const items2 = slider.getElementsByClassName('news__item');
const itemsCount = items2.length;
const itemWidth = slider.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

for (let item of items2) {
   item.style.minWidth = `${itemWidth}px`;
}


function showNextSlides() {
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
   setPosition();
   checkBtns();
}

function showPrevSlides() {
   const itemsLeft = Math.abs(position) / itemWidth;

   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

   setPosition();
   checkBtns();
}

function setPosition() {
   track.style.transform = `translateX(${position}px)`;
   console.log(track.style.transform)
}

function checkBtns() {
   btnPrev.disabled = position === 0;
   btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

btnNext.addEventListener('click', showNextSlides);
btnPrev.addEventListener('click', showPrevSlides);

checkBtns();
