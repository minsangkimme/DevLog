const userInfoEl = document.querySelector('.userInfo');
const userReposEl = document.querySelector('.userRepos');
const form = document.querySelector('form');
const inputTextEl = document.querySelector('.form-control');

const init = () => {
  inputTextEl.addEventListener('keyup', getUserInfo);
  form.addEventListener('submit', handleSubmit);
};
const getUserInfo = (e) => {
  const userName = e.target.value;
  fetch(`https://api.github.com/users/${userName}`)
    .then((response) => response.json())
    .then((userInfo) => renderInfo(userInfo))
    .then((res) => (userInfoEl.innerHTML = res));

  fetch(`https://api.github.com/users/${userName}/repos`)
    .then((response) => response.json())
    .then((userRepos) => renderRepos(userRepos))
    .then((res) => (userReposEl.innerHTML = res));
};

const handleSubmit = (e) => {
  e.preventDefault();
};

const renderRepos = (userRepos) => {
  const repos = userRepos.map((item) => {
    const url = item.html_url;
    const description = item.description ? item.description : '';
    const forkCount = item.forks_count;
    const watchers = item.watchers_count;

    return `<div>
                            <a href=${url} target="_blank">${item.name}</a>
                            <div>${description}</div>
                            <span class="label label-default">${watchers}Watchers</span>
                            <span class="label label-primary">${forkCount}Forks</span>
                            <hr>                            
                        </div>`;
  }).join('');

  console.log(repos);
  return ` <div class='panel-default userRepos'>
                    <div class='panel-heading'>
                        <h3 class="panel-title">Repos</h3>
                    </div>
                    <div class="panel-body">${repos}</div>              
                </div>`;
};

const renderInfo = (userInfo) => {
  return `<div class='panel-default userInfo'>
                        <div class='panel-heading'>
                            <h3 class="panel-title">${userInfo.name}</h3>
                        </div>
                        <div class="panel-body">
                            <div class="panel-image"><img src="${userInfo.avatar_url}" alt="프로필 이미지" /></div>
                            <div class="stat">
                                <span class="label label-default">${userInfo.public_repos}Public Repository</span>
                                <span class="label label-primary">${userInfo.public_gists}Public Gits</span>
                                <span class="label label-success">${userInfo.followers} Followers</span>
                                <span class="label label-info">${userInfo.following} Following</span>
                            </div>
                        </div>
                    <br>
                        <div class='list'>
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Username: </strong>
                                    ${userInfo.login}
                                </li>
                                <li class="list-group-item"><strong>Location: </strong>
                                    ${userInfo.location}
                                </li>
                                <li class="list-group-item"><strong>Email: </strong>
                                    ${userInfo.email ? userInfo.email : ''}
                                </li>
                                <li class="list-group-item"><strong>Blog: </strong>
                                    ${userInfo.blog}
                                </li>
                                <li class="list-group-item"><strong>Member Since: </strong>
                                    ${userInfo.created_at}
                                </li>
                            </ul>
                        </div>
                    </div>                
                `;
};
window.onload = () => {
  init();
};
