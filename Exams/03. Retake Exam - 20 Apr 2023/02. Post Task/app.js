window.addEventListener("load", solve);

function solve() {
    const titleInput = document.getElementById("task-title");
    const categoryInput = document.getElementById("task-category");
    const contentTextArea = document.getElementById("task-content");
    const publishButton = document.getElementById("publish-btn");
    const reviewUl = document.getElementById("review-list");
    const publishedUl = document.getElementById("published-list");

    publishButton.addEventListener("click", publish);


    // -- Event handlers

    function publish() {
        const [title, category, content] = readInput();

        if (title && category && content) {
            clearInput();
            reviewUl.appendChild(buildReviewLi(title, category, content));
        }
    }

    function edit(e) {
        const reviewLiElement = e.currentTarget.parentElement;
        const [title, category, content] = extractTextsFromArticle(reviewLiElement);
        setInput(title, category, content);
        reviewLiElement.remove();
    }

    function post(e) {
        const reviewLiElement = e.currentTarget.parentElement;
        const [title, category, content] = extractTextsFromArticle(reviewLiElement);
        reviewLiElement.remove();

        const articleElement = buildArticleItem(title, category, content);
        const publishedLiElement = buildHtmlElement("li", null, null, ["rpost"], articleElement);
        publishedUl.appendChild(publishedLiElement);
    }

    // -- Helper functions

    function readInput() {
        const title = titleInput.value;
        const category = categoryInput.value;
        const content = contentTextArea.value;
        return [title, category, content];
    }

    function clearInput() {
        titleInput.value = "";
        categoryInput.value = "";
        contentTextArea.value = "";
    }

    function setInput(title, category, content) {
        titleInput.value = title;
        categoryInput.value = category;
        contentTextArea.value = content;
    }

    function extractTextsFromArticle(liElement) {
        const innerArticleElements = Array.from(liElement.querySelector("article").children);

        const title = innerArticleElements[0].textContent;
        const category = innerArticleElements[1].textContent.slice("Category: ".length);
        const content = innerArticleElements[2].textContent.slice("Content: ".length);
        return [title, category, content];
    }

    // -- Html builders

    function buildReviewLi(title, category, content) {
        const article = buildArticleItem(title, category, content);
        const editButton = buildHtmlElement("button", "Edit", null, ["action-btn", "edit"]);
        const postButton = buildHtmlElement("button", "Post", null, ["action-btn", "post"]);

        editButton.addEventListener("click", edit);
        postButton.addEventListener("click", post);

        const li = buildHtmlElement("li", null, null, ["rpost"], article, editButton, postButton);
        return li;
    }

    function buildArticleItem(title, category, content) {
        const titleH4 = buildHtmlElement("h4", title, null, null);
        const categoryP = buildHtmlElement("p", `Category: ${category}`, null, null);
        const contentP = buildHtmlElement("p", `Content: ${content}`, null, null);

        const article = buildHtmlElement("article", null, null, null, titleH4, categoryP, contentP);
        return article;
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