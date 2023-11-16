function solve() {
  let rightAnswersCount = 0;
  let questionNumber = 0;

  const sectionElements = Array.from(document.getElementsByTagName("section"));
  const resultsElement = document.getElementById("results");
  const outputH1Element = document.querySelector(".results-inner h1");
  const quizzAnswers = Array.from(document.getElementsByClassName("quiz-answer"));

  quizzAnswers[0].classList.add("right-answer");
  quizzAnswers[3].classList.add("right-answer");
  quizzAnswers[4].classList.add("right-answer");

  quizzAnswers.forEach(a => {
    a.addEventListener("click", (e) => {
      const elementClicked = e.target;
      let answer = elementClicked.parentElement;

      if (!answer.classList.contains("quiz-answer")) {
        answer = answer.parentElement;
      }
      if (answer.classList.contains("right-answer")) {
        rightAnswersCount++;
      }

      if (questionNumber < 2) {
        sectionElements[questionNumber].style.display = "none";
        questionNumber++;
        sectionElements[questionNumber].style.display = "block";
      } else {
        sectionElements[2].style.display = "none";
        resultsElement.style.display = "block";
        outputH1Element.textContent = rightAnswersCount === 3
          ? "You are recognized as top JavaScript fan!"
          : `You have ${rightAnswersCount} right answers`;
      }
    })
  })
}
