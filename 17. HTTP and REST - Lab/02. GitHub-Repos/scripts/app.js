async function loadRepos() {
   const response = await fetch('https://api.github.com/users/testnakov/repos');
   const bodyAsText = await response.text();
   document.getElementById("res").textContent = bodyAsText;
}