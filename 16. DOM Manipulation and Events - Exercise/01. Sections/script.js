function create(words) {
   const contentParentElement = document.getElementById("content");
   for (const word of words) {
      const p = document.createElement("p");
      const div = document.createElement("div");
      p.textContent = word;
      p.style.display = "none";
      div.appendChild(p);

      div.addEventListener("click", () => {
         div.children[0].style.display = "";
      })

      contentParentElement.appendChild(div);
   }
}