function search() {
   let towns = Array.from(document.querySelectorAll("ul li"));
   let searchText = document.getElementById("searchText").value;
   let matchesCount = 0;

   for (const town of towns) {
      town.style.textDecoration = "none";
      town.style.fontWeight = "normal";
      if (town.textContent.includes(searchText)) {
         town.style.textDecoration = "underline";
         town.style.fontWeight = "bold";
         matchesCount++;
      }      
   }
   document.getElementById("result").textContent = `${matchesCount} matches found`;
}
