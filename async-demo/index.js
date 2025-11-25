console.log("Before");
// Promise Approach
// getUser(1)
//     .then(user => { return getRepositories(user.gitHubUsername) })
//     .then(repos => { return getCommits(repos[0])})
//     .then(commits => { console.log('Commit', commits)})
//     .catch(err => console.log('Error', err.message));

// Async and Await Approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } 
    catch (error) {
        console.log('Error:', error.message);     
    }
}
displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repo2", "repo3"]);
    // reject(new Error('Could not reach repo'));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}
