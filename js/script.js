const overview = document.querySelector(".overview")
const username = "Silverpool64";

async function getGitHub() {
	const request = await fetch(`https://api.github.com/users/${username}`);
	const data = await request.json();
	displayInfo(data);
}

getGitHub();

function displayInfo(data) {
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
}