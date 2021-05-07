"use strict";

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

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}
