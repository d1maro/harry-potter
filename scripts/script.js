"use strict";

// import { data } from "./hp.js";

let url = "http://hp-api.herokuapp.com/api/characters"; // внешний api для подгрузки персонажей

// async function getData() {
//   let response = await fetch(url);
//   let data = await response.json();
//   return data;
// }

let data = await fetch(url) // переменная, в которую записыватеся информация из промиса
  .then((res) => res.json())
  .then((data) => data);

const container = document.querySelector(".container__flex"); // переменная для области загрузки карточек

const form = document.forms[0];
form.addEventListener("submit", (event) => event.preventDefault()); // отменяем действие браузера по умолчанию: перезагрузку страницы при каждом вводе формы

const inputData = document.querySelector("input"); // переменная для поля инпута
inputData.addEventListener("change", inputHandler); // прослушиватель события для инпута

const selectData = document.querySelector("select"); // переменная для выпадающего списка
selectData.addEventListener("change", inputHandler); // прослушиватель для выпадающего списка

function createCard(data) {
  // функция для создания карточки
  const card = document.createElement("article"); // создаем карточку
  card.className = "characters__card"; // присваиваем карточке заранее прописанный класс

  const img = document.createElement("img"); // добавляем изображение
  img.setAttribute(
    "src",
    data.image !== ""
      ? data.image
      : "https://i.pinimg.com/originals/8b/b3/99/8bb3991dca3078f26bab8d07770f8d33.png"
  );
  img.setAttribute("width", 334);
  img.setAttribute("height", 192); // присваиваем картинке атрибуты: адрес для заглушки и размеры

  const text = document.createElement("div"); // создаем общий див и присваиваем класс
  text.className = "card__text";

  const title = document.createElement("h2"); // создаем заголовок и присваиваем класс
  title.className = "card__title";
  title.textContent = data.name; // задаем текстовое содержание из внешнего объекта

  const description = document.createElement("div"); // создаем див для текстового описания и даем класс
  description.className = "card__description";

  const p1 = document.createElement("p"); // создаем абзац в описании и задаем значение из объекта
  p1.textContent = `Actor: ${data.actor}`;

  const p2 = document.createElement("p");
  p2.textContent = `Gender: ${data.gender}`;

  const p3 = document.createElement("p");
  p3.textContent = `House: ${data.house}`;

  const p4 = document.createElement("p");
  p4.textContent = `Wand core: ${data.wand.core}`;

  const p5 = document.createElement("p");
  p5.textContent = `Alive: ${data.alive == true ? "yes" : "no"}`; // проверяем значение поля и выводим да или нет

  card.append(img); // добавляем в карточку изображение

  description.append(p1); // добавляем абзацы в описание
  description.append(p2);
  description.append(p3);
  description.append(p4);
  description.append(p5);

  text.append(title); // добавляем заголовок и описание в текстовый блок
  text.append(description);

  card.append(text); // добавляем текстовый блок в карточку

  return card; // возвращаем карточку
}

data.forEach((elem) => {
  container.append(createCard(elem));
}); // с помощью цикла отрисовываем карточки

function inputHandler() {
  let pers = inputData.value.toLowerCase().trim(); // поиск по персонажу не чувствителен к регистру и случайным пробелам
  let school = selectData.value.toLowerCase(); // поиск по школе не чувствителен к регистру
  let filtered = data // двойная фильтрация: ищем по совпадению с инпутом и по выбранному полю школы
    .filter((elem) => elem.name.toLowerCase().includes(pers))
    .filter(
      (elem) => elem.house.toLowerCase() === school || school === "allschools"
    );
  container.innerHTML = ""; // очищаем содержание контейнера
  filtered.forEach((elem) => container.append(createCard(elem))); // вызываем функцию для создания карточки для отфильтрованных значений
}
