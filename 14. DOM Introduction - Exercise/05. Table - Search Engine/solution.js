function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {    
      let inputField = document.getElementById("searchField");
      const stringToSearchFor = inputField.value;
      inputField.value = "";
      
      const allRows = Array.from(document.querySelectorAll("table tbody tr"));
      for (const row of allRows) {
         row.classList.remove("select");
         let cols = Array.from(row.children);         

         for (const col of cols) {
            if (col.textContent.includes(stringToSearchFor)) {
               row.className = "select";
               break;
            }
         }
      }
   }
}