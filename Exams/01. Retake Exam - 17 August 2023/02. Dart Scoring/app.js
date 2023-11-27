//window.addEventListener("load", solve);

function solve() {
  const addButton = document.getElementById("add-btn");
  const playerInput = document.getElementById("player");
  const scoreInput = document.getElementById("score");
  const roundInput = document.getElementById("round");
  const sureListUl = document.getElementById("sure-list");
  const scoreboardUl = document.getElementById("scoreboard-list");
  const clearButton = document.getElementsByClassName("clear")[0];

  addButton.addEventListener("click", add);
  clearButton.addEventListener("click", clear);


  // -- Event handlers --

  function add() {
    const player = playerInput.value;
    const score = scoreInput.value;
    const round = roundInput.value;

    if (player && score && round) {
      const article = buildArticleElement(player, `Score: ${score}`, `Round: ${round}`);

      const editButton = buildButtonElement("edit", "edit");
      const okButton = buildButtonElement("ok", "ok");

      editButton.addEventListener("click", edit);
      okButton.addEventListener("click", ok);
      
      const listElement = buildLiElement(article, editButton, okButton, "dart-item");
      sureListUl.appendChild(listElement);

      playerInput.value = "";
      scoreInput.value = "";
      roundInput.value = "";

      addButton.disabled = true;
    }
  }

  function edit() {
    const dartItems = Array.from(document.querySelector("li.dart-item article").children);
    const [player, score, round] = dartItems.map(item => item.textContent);

    playerInput.value = player;
    scoreInput.value = score.split(": ")[1];
    roundInput.value = round.split(": ")[1];

    document.getElementsByClassName("dart-item")[0].remove();
    addButton.disabled = false;
  }

  function ok() {
    const dartItems = Array.from(document.querySelector("li.dart-item article").children);
    const [player, score, round] = dartItems.map(item => item.textContent);

    document.getElementsByClassName("dart-item")[0].remove();
    addButton.disabled = false;

    const article = buildArticleElement(player, score, round);
    
    const li = buildLiElement(article, null, null, "dart-item");    
    scoreboardUl.appendChild(li);
  }

  function clear() {
    location.reload();
  }
    

  // -- HTML builders --

  function buildPElement(content) {
    const p = document.createElement("p");
    p.textContent = content;
    return p;
  }

  function buildButtonElement(content, className) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add(className);
    button.textContent = content;
    return button;
  }

  function buildArticleElement(content1, content2, content3) {
    const article = document.createElement("article");
    article.appendChild(buildPElement(content1));
    article.appendChild(buildPElement(content2));
    article.appendChild(buildPElement(content3));
    return article;    
  }

  function buildLiElement(item1, item2, item3, className) {
    const li = document.createElement("li");
    li.classList.add(className);
    li.appendChild(item1);    
    if (item2 && item3) {
      li.appendChild(item2);
      li.appendChild(item3);
    }
    return li;
  }
}
