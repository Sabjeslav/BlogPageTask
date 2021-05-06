"use strict";

const addArticle = document.querySelector(".main-btn");
const modalWindow = document.querySelector(".modal-wrapper");
const cancelBtn = document.querySelector(".modal-btn-cancel");
const publishBtn = document.querySelector(".modal-btn-publish");
const form = document.querySelector(".post-form");
const articleTitle = document.querySelector(".modal-input-title");
const articleContent = document.querySelector(".modal-input-content");
const articlesWrapper = document.querySelector(".articles-wrapper");
const searchInput = document.querySelector(".header-search-input");

function renderArticles(searchStr) {
  if (searchStr) {
    articlesWrapper.textContent = "";
    const articleList = Data.filter((item) =>
      item.name.toLowerCase().includes(searchStr.toLowerCase())
    ).map((item) => {
      return createArticleWrapper(item);
    });
    articlesWrapper.append(...articleList);
  } else {
    articlesWrapper.textContent = "";
    const articleList = Data.map((item) => {
      return createArticleWrapper(item);
    });
    articlesWrapper.append(...articleList);
  }
}

function createArticleWrapper(item) {
  return createElement(
    "div",
    { classNames: ["main-article"] },
    articleHeader(item),
    articleText(item)
  );
}

function articleHeader({ name, date }) {
  const articleName = createElement("div", {
    classNames: ["main-article-name"],
  });
  articleName.textContent = name;
  const articleDate = createElement("div", {
    classNames: ["main-article-date"],
  });
  articleDate.textContent = date;
  return createElement(
    "div",
    { classNames: ["main-article-header"] },
    articleName,
    articleDate
  );
}

function articleText({ content }) {
  const textContent = createElement("div", {
    classNames: ["main-article-content"],
  });
  textContent.textContent = content;
  return textContent;
}

function getCurrentDate() {
  let today = new Date();
  return today.toLocaleDateString();
}

function closeForm() {
  form.reset();
  articleTitle.classList.remove("modal-input-error");
  articleContent.classList.remove("modal-input-error");
  modalWindow.classList.toggle("modal-visible");
}

addArticle.addEventListener("click", () => {
  modalWindow.classList.toggle("modal-visible");
});

window.addEventListener("click", (e) => {
  if (e.target == modalWindow) {
    closeForm();
  }
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeForm();
});

articleTitle.addEventListener("change", () => {
  articleTitle.classList.remove("modal-input-error");
});

articleContent.addEventListener("change", () => {
  articleContent.classList.remove("modal-input-error");
});

publishBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!articleTitle.value) {
    articleTitle.classList.add("modal-input-error");
    return;
  }
  if (!articleContent.value) {
    articleContent.classList.add("modal-input-error");
    return;
  }
  const newArticle = {
    name: articleTitle.value,
    date: getCurrentDate(),
    content: articleContent.value,
  };
  Data.push(newArticle);
  searchInput.value="";
  renderArticles(searchInput.value);
  // articlesWrapper.append(createArticleWrapper(newArticle));
  closeForm();
});

searchInput.addEventListener("input", () => {
  renderArticles(searchInput.value);
});

renderArticles();

/**
 *  Creates an HTML element with following parameters:
 * @param {string} tagName
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {object} options.handlers - event handlers
 * @param {object} options.attributes - event attributes
 * @param  {...Node} children
 * @returns {HTMLElement}
 */
function createElement(
  tagName,
  { classNames = [], handlers = {}, attributes = {} } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);

  // const attr = {
  //   src: "htpps://example.com",
  //   value: "text",
  //   name: "textInput",
  // };

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}
