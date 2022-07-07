'use strict';

function addActiveClass(item) {
   item.classList.add('active');
}

function showPreloaderItems() {
   const logo = document.getElementById('preloader-logo');
   const gif = document.getElementById('preloader-gif');

   setTimeout(() => {
      addActiveClass(logo);
      addActiveClass(gif);
   }, 200);
}

showPreloaderItems();

function hidePreloader() {
   const preloader = document.getElementById('preloader');
   setTimeout(() => addActiveClass(preloader), 3000);
}

hidePreloader();