async function loadRepos() {
	const username = document.getElementById("username").value;
	const userGithubUrl = `https://api.github.com/users/${username}/repos`;
	const response = await fetch(userGithubUrl);
	const userRepos = await response.json();
	const ul = document.getElementById("repos");

	ul.innerHTML = "";
	userRepos.forEach(repo => {
		const repoName = repo.full_name;
		const repoUrl = repo.html_url;

		const a = document.createElement("a");
		a.href = repoUrl;
		a.textContent = repoName;		
		const li = document.createElement("li");
		li.appendChild(a);
		ul.appendChild(li);
	});
}