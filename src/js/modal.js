"use strict";

const addArticle = document.querySelector(".main-btn");
const modalWindow = document.querySelector(".modal-wrapper");
const cancelBtn = document.querySelector(".modal-btn-cancel");
const publishBtn = document.querySelector(".modal-btn-publish");
const form = document.querySelector(".post-form");
const articleTitle = document.querySelector(".modal-input-title");
const articleContent = document.querySelector(".modal-input-content");

addArticle.addEventListener("click", () => {
  modalWindow.classList.toggle("modal-visible");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeForm();
});

modalWindow.addEventListener("click", (e) => {
  if (e.target == modalWindow) {
    closeForm();
  }
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
  searchInput.value = "";
  renderArticles(searchInput.value);
  closeForm();
});

function closeForm() {
  form.reset();
  articleTitle.classList.remove("modal-input-error");
  articleContent.classList.remove("modal-input-error");
  modalWindow.classList.toggle("modal-visible");
}
