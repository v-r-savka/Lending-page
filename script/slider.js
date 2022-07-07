'use strict';


const items = document.querySelectorAll('.testimonials__item');
const itemCount = items.length;
const nextItem = document.querySelector('.testimonials__btn--right');
const previousItem = document.querySelector('.testimonials__btn--left');
let count = 0;

function showNextItem() {
   items[count].classList.remove('testimonials__item--active');

   if (count < itemCount - 1) {
      count++;
   } else {
      count = 0;
   }

   items[count].classList.add('testimonials__item--active');
}

function showPreviousItem() {
   items[count].classList.remove('testimonials__item--active');

   if (count > 0) {
      count--;
   } else {
      count = itemCount - 1;
   }

   items[count].classList.add('testimonials__item--active');
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);