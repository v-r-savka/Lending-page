"use strict";function addActiveClass(e){e.classList.add("active")}function showPreloaderItems(){const e=document.getElementById("preloader-logo"),t=document.getElementById("preloader-gif");setTimeout(()=>{addActiveClass(e),addActiveClass(t)},200)}function hidePreloader(){const e=document.getElementById("preloader");setTimeout(()=>addActiveClass(e),3e3)}showPreloaderItems(),hidePreloader();