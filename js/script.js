const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");

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
    gitRepos();
}

async function gitRepos() {
	const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
	const repoData = await fetchRepos.json();
	displayRepoInfo(repoData);
}

function displayRepoInfo(repos) {
	for (repo of repos) {
		const repoItem = document.createElement("li");
    	repoItem.classList.add("repo");
    	repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    	repoList.append(repoItem);
	}
}