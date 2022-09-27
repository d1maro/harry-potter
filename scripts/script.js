"use strict";

import {data} from "./hp.js";

const container = document.querySelector(".container__flex");

function createCard(data) {
    const card = document.createElement("article");
    card.className = "characters__card";

    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    img.setAttribute("width", 334);
    img.setAttribute("height", 192);

    const text = document.createElement("div");
    text.className = "card__text";

    const title = document.createElement("h2");
    title.className = "card__title";
    title.textContent = data.name;

    const description = document.createElement("div");
    description.className = "card__description";

    const p1 = document.createElement("p");
    p1.textContent = `Actor: ${data.actor}`;

    const p2 = document.createElement("p");
    p2.textContent = `Gender: ${data.gender}`;

    const p3 = document.createElement("p");
    p3.textContent = `House: ${data.house}`;

    const p4 = document.createElement("p");
    p4.textContent = `Wand core: ${data.wand}`;

    const p5 = document.createElement("p");
    p5.textContent = `Alive: ${true ? "yes" : "no"}`;

    card.append(img);

    description.append(p1);
    description.append(p2);
    description.append(p3);
    description.append(p4);
    description.append(p5);

    text.append(title);
    text.append(description);
    
    card.append(text);
    
    return card;
}

data.forEach(elem => {
    container.append(createCard(elem))
})


