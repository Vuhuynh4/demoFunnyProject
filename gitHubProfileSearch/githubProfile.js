const GIT_PROFILE_API_ENDPOINT = "https://api.github.com/users/";
const formSearch = document.getElementById("formSearch");
const txtSearch = document.getElementById("txtSearch");
const profileDiv = document.getElementById("profile");

getGitHubProfile("Vuhuynh4");

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const gitHubName = txtSearch.value;

    if (gitHubName) {
        getGitHubProfile(gitHubName);
        gitHubName.value = "";
    }
})


async function getGitHubProfile(gitHubName) {
    
    const resp = await fetch(GIT_PROFILE_API_ENDPOINT + gitHubName);
    const jsonRespData = await resp.json();

    addProfileDataToMain(jsonRespData);

    getGitHubProfileReposLink(gitHubName);
}

async function getGitHubProfileReposLink(gitHubName) {
    
    const resp = await fetch(GIT_PROFILE_API_ENDPOINT + gitHubName + '/repos');
    const jsonRespData = await resp.json();

    addReposLinkToMain(jsonRespData);
}



function addProfileDataToMain(profileData){
    const profileHTML = `
    <div class="card">
    <div>
        <img class="avatar" src="${profileData.avatar_url}" alt="${profileData.name}" />
    </div>
    <div class="profile-info">
        <h2>${profileData.name}</h2>
        <p>${profileData.bio}</p>
        <ul class="info">
            <li> ${profileData.followers}<strong> Followers - &nbsp</strong></li>
            <li> ${profileData.following}<strong> Following - &nbsp</strong></li>
            <li> ${profileData.public_repos}<strong> Repos</strong></li>
        </ul>
        <div id="repos"></div>
    </div>
</div>
    `;
    profileDiv.innerHTML = profileHTML;
}

function addReposLinkToMain(reposData) {
    const reposDiv = document.getElementById("repos");

    reposData
        // .sort((a, b) => b.stargazers_count - a.stargazers_count)
        // .slice(0, 10)
        .forEach((repo) => {
            const repoLink = document.createElement("a");
            repoLink.classList.add("repo");

            repoLink.href = repo.html_url;
            repoLink.target = "_blank";
            repoLink.innerText = repo.name;

            reposDiv.appendChild(repoLink);
        });
}