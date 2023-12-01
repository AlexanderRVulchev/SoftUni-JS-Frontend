window.addEventListener("load", solve);

function solve() {
  const studentInput = document.getElementById("student");
  const universityInput = document.getElementById("university");
  const scoreInput = document.getElementById("score");
  const nextButton = document.getElementById("next-btn");
  const previewUl = document.getElementById("preview-list");
  const candidatesUl = document.getElementById("candidates-list");

  nextButton.addEventListener("click", nextEvent);

  // -- Event handlers

  function nextEvent() {
    const student = studentInput.value;
    const university = universityInput.value;
    const score = scoreInput.value;

    studentInput.value = "";
    universityInput.value = "";
    scoreInput.value = "";
    nextButton.disabled = true;

    if (student && university && score) {
      previewUl.appendChild(buildApplicationItem(student, university, score));
    }
  }

  function editEvent() {
    const [student, university, score] = readAndClearPreviewList();

    studentInput.value = student;
    universityInput.value = university;
    scoreInput.value = score;

    nextButton.disabled = false;
  }

  function applyEvent() {
    const [student, university, score] = readAndClearPreviewList();

    const article = buildArticleElement(student, university, score);
    const li = buildHtmlElement("li", null, null, ["application"], article);
    candidatesUl.appendChild(li);

    nextButton.disabled = false;
  }

  // -- Helper functions

  function readAndClearPreviewList() {
    const article = document.querySelector("#preview-list li.application article");
    const [studentH4, universityP, scoreP] = Array.from(article.children);

    const student = studentH4.textContent;
    const university = universityP.textContent.slice("University: ".length);
    const score = scoreP.textContent.slice("Score: ".length);

    previewUl.innerHTML = "";
    return [student, university, score];
  }

  // -- Html builders

  function buildApplicationItem(student, university, score) {
    const article = buildArticleElement(student, university, score);

    const editButton = buildHtmlElement("button", "edit", null, ["action-btn", "edit"]);
    const applyButton = buildHtmlElement("button", "apply", null, ["action-btn", "apply"]);

    editButton.addEventListener("click", editEvent);
    applyButton.addEventListener("click", applyEvent);

    return buildHtmlElement("li", null, null, ["application"], article, editButton, applyButton);
  }

  function buildArticleElement(student, university, score) {
    const studentH4 = buildHtmlElement("h4", student, null, null);
    const universityP = buildHtmlElement("p", `University: ${university}`, null, null);
    const scoreP = buildHtmlElement("p", `Score: ${score}`, null, null);

    return buildHtmlElement("article", null, null, null, studentH4, universityP, scoreP);
  }

  function buildHtmlElement(tag, text, id, classNames, ...children) {
    const element = document.createElement(tag);
    if (text !== null) {
      element.textContent = text;
    }
    if (id !== null) {
      element.id = id;
    }
    if (classNames !== null) {
      classNames.forEach(className => {
        element.classList.add(className);
      });
    }

    for (const child of children) {
      element.appendChild(child);
    }

    return element;
  }
}