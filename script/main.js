"use strict";

const validateForm = document.forms.feedback;

validateForm.addEventListener("submit", formSend);
async function formSend(e) {
  e.preventDefault();
  function formValidate(form) {
    let error = 0;
    const formReq = form.querySelectorAll(".required");

    function emailTest(input) {
      let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
      return !regExp.test(input.value);
    }

    formReq.forEach((input) => {
      if (input.classList.contains("contact__email")) {
        if (emailTest(input)) {
          input.classList.add("invalid");
          input.nextElementSibling.innerHTML = "Please, enter correct email";
          error++;
        }
      } else if (input.value === "") {
        input.classList.add("invalid");
        input.nextElementSibling.innerHTML = "This field is empty";
        error++;
      }
    });

    return error;
  }
  let error = formValidate(validateForm);

  if (error === 0) {
    let response = await fetch(
      "https://my-json-server.typicode.com/v-r-savka/json/posts/",
      {
        method: "POST",
        body: new FormData(validateForm),
      }
    );
    for (let i = 0; i < 4; i++) {
      validateForm[i].value = "";
    }

    function deleteMess() {
      document.getElementById("message--success").remove();
    }
    if (response.status >= 200 && response.status <= 300) {
      let div = document.createElement("div");
      div.setAttribute("id", "message--success");
      div.innerHTML = "Message sent successfully";
      validateForm.after(div);

      setTimeout(deleteMess, 5000);
    } else {
      let div = document.createElement("div");
      div.setAttribute("id", "message--error");

      switch (response.status) {
        case 400:
          div.innerHTML = `Bad Request
               please try again later`;
          break;
        case 403:
          div.innerHTML = `Forbidden
               please try again later`;
          break;
        case 404:
          div.innerHTML = `Not Found
               please try again later`;
          break;
        case 500:
          div.innerHTML = `Internal Server Error
               please try again later`;
          break;
        case 503:
          div.innerHTML = `Service Unavailable
               please try again later`;
          break;
        case 504:
          div.innerHTML = `Gateway Timeout
               please try again later`;
          break;
        default:
          div.innerHTML = `Message isn\'t send, 
               please try again later`;
          break;
      }
      validateForm.after(div);
      function deleteErrMess() {
        document.getElementById("message--error").remove();
      }
      setTimeout(deleteErrMess, 5000);
    }
  }
}

function deleteErrorOnFocus() {
  for (const field of validateForm.elements) {
    const onFocus = function () {
      if (this.classList.contains("invalid")) {
        this.classList.remove("invalid");
        this.nextElementSibling.innerHTML = "";
      }
    };
    field.addEventListener("focus", onFocus);
  }
}
deleteErrorOnFocus();

//графік

function drawGraph() {
  const canvases = document.querySelectorAll(".about__canvas");

  const parallaxSection = document.querySelector(".parallax");
  const aboutSection = document.querySelector(".about");

  //  ще таку умову можна задати  window.scrollY >= 600

  if (parallaxSection.clientHeight === aboutSection.offsetTop) {
    canvases.forEach((item) => {
      let progress = 0;
      let timer;
      const canvas = item;
      const ctx = canvas.getContext("2d");
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const radius = 100;
      const startAngle = 1.5 * Math.PI;
      const value = parseInt(canvas.previousElementSibling.innerHTML);
      const counterClockwise = false;

      function drawText(x, y, text, ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "grey";
        ctx.fillText(text, x, y);
      }

      function removeText(x, y, txt_length, font_height, char_width, ctx) {
        ctx.clearRect(x, y - font_height, char_width * txt_length, font_height);
      }
      window.removeEventListener("scroll", drawGraph);
      timer = setInterval(() => {
        let procent = (progress * 2) / 100;
        let endAngle = (procent + 1.5) * Math.PI;
        let text = `${Math.abs(progress - 1)}%`;

        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        ctx.lineWidth = 12;
        ctx.strokeStyle = "#f2c351";
        ctx.stroke();
        removeText(105, 140, text.length, 24, 20, ctx);

        drawText(105, 140, text, ctx);
        if (progress > value) {
          clearInterval(timer);
        }
        progress++;
      }, 50);
    });
  }
}

window.addEventListener("scroll", drawGraph);

//при скролі прозорість хедеру

const header = document.getElementById("header");

window.addEventListener("scroll", onScroll);

function onScroll() {
  if (window.pageYOffset > 0) {
    header.classList.add("active");
  } else if (window.pageYOffset === 0) {
    header.classList.remove("active");
  }
}

//анімаціяя при скролі

const animItems = document.querySelectorAll(".anim-items");

window.addEventListener("scroll", checkItems);

checkItems();
function checkItems() {
  const triggerBottom = (window.innerHeight / 5) * 4;

  animItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add("active");
    } else if (!item.classList.contains("anim-no-hide")) {
      item.classList.remove("active");
    }
  });
}

// плавний скрол для меню

const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach((smoothLink) => {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const navigation = document.getElementsByClassName("header__navigation");

    const id = smoothLink.getAttribute("href");
    const targetSection = document.querySelector(id);
    navigation[0].classList.toggle("header__navigation--active");

    window.scrollBy({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });
  });
});

//додав плавний скрол для кнопок

const paralaxBtns = document.querySelectorAll(".parallax__btn");

paralaxBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const id = btn.firstElementChild.getAttribute("href");
    const targetSection = document.querySelector(id);

    window.scrollBy({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });
  });
});

//слайд шоу

// let position = 0;
// const slidesToShow = 2;
// const slidesToScroll = 1;
// const slider = document.getElementById("news__slider");
// const track = document.getElementById("news__track");
// const btnPrev = document.getElementById("news__btn--left");
// const btnNext = document.getElementById("news__btn--right");
// const items2 = slider.getElementsByClassName("news__item");
// const itemsCount = items2.length;
// const itemWidth = slider.clientWidth / slidesToShow;
// const movePosition = slidesToScroll * itemWidth;

// for (let item of items2) {
//   item.style.minWidth = `${itemWidth}px`;
// }

// function showNextSlides() {
//   const itemsLeft =
//     itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

//   position -=
//     itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
//   setPosition();
//   checkBtns();
// }

// function showPrevSlides() {
//   const itemsLeft = Math.abs(position) / itemWidth;

//   position +=
//     itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

//   setPosition();
//   checkBtns();
// }

// function setPosition() {
//   track.style.transform = `translateX(${position}px)`;
// }

// function checkBtns() {
//   btnPrev.disabled = position === 0;
//   btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
// }

// btnNext.addEventListener("click", showNextSlides);
// btnPrev.addEventListener("click", showPrevSlides);

// checkBtns();

//прихований навбар
const navigation = document.querySelectorAll(".header__navigation");
const parallax = document.getElementById("parallax");

parallax.addEventListener("click", () => {
  if (!navigation[0].classList.contains("header__navigation--active")) {
    return;
  } else {
    navigation[0].classList.remove("header__navigation--active");
    navigation[0].classList.add("header__navigation--hide");
  }
});

function showNavbar() {
  const burger = document.getElementsByClassName("header__burger");

  burger[0].addEventListener("click", addActiveClass);

  function addActiveClass() {
    navigation[0].classList.remove("header__navigation--hide");

    navigation[0].classList.toggle("header__navigation--active");
  }
}
showNavbar();
