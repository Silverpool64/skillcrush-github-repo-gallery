const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const username = "Silverpool64";

async function getGitHub() {
	const request = await fetch(`https://api.github.com/users/${username}`);
	const data = await request.json();
	displayUserInfo(data);
}

getGitHub();

function displayUserInfo(data) {
	const div = document.createElement("div");
	div.classList.add("user-info");
	div.innerHTML = `
	<figure>
    	<img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    	<p><strong>Name:</strong> ${data.login}</p>
    	<p><strong>Bio:</strong> ${data.bio}</p>
    	<p><strong>Location:</strong> ${data.location}</p>
    	<p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    overview.append(div);
    gitRepos(username);
}

async function gitRepos(username) {
	const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
	const repoData = await fetchRepos.json();
	displayRepos(repoData);
}

function displayRepos(repos) {
	filterInput.classList.remove("hide");
	for (repo of repos) {
		const repoItem = document.createElement("li");
    	repoItem.classList.add("repo");
    	repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    	repoList.append(repoItem);
	}
}

repoList.addEventListener("click", function(e) {
	if (e.target.matches("h3")) {
		let repoName = e.target.innerText;
		gitRepoInfo(repoName);
	}
});

async function gitRepoInfo(repoName) {
	const request = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
	const repoInfo = await request.json();

	const fetchLanguages = await fetch(repoInfo.languages_url);
	const languageData = await fetchLanguages.json();

	const languages = [];
  	for (const language in languageData) {
    	languages.push(language);
	}

	displayRepoInfo(repoInfo, languages);
}

async function displayRepoInfo(repoInfo, languages) {
	repoData.innerHTML = "";
	repoData.classList.remove("hide");
	backButton.classList.remove("hide");
    allReposContainer.classList.add("hide");

	const div = document.createElement("div");
	div.innerHTML = `
	<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
}

backButton.addEventListener("click", function() {
	allReposContainer.classList.remove("hide");
	repoData.classList.add("hide");
	backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
	const searchText = e.target.value;
	const repos = document.querySelectorAll(".repo");
	const searchLowerText = searchText.toLowerCase();

	for (const repo of repos) {
		const repoLowerText = repo.innerText.toLowerCase();
		if (repoLowerText.includes(searchLowerText)) {
			repo.classList.remove("hide");
		} else {
			repo.classList.add("hide");
		}
	}
});