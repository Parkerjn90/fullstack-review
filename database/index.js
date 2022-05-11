const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoID: {type: Number, required: true, unique: true}, // unique repo ID - comes from id
  repoName: String, // repo name - comes from name
  userName: String, // git user - comes from owner.login // camelCase
  userLink: String, // git user's github - comes from owner.html_url
  repoLink: String, // specific repo's url - comes from html_url
  stars: Number, // option 1 for finding top repos - comes from stargazers_count
  watches: Number, // option 2 for finding top repos - comes from watchers_count
  forks: Number // option 3 for finding top repos - comes from forks_count
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  console.log('repos in save in database/index', repos)
  repos.map(repo => {
    // create instance, set values as you want them
    Repo.findOneAndUpdate({repo}, { // findOneAndUpdate
      repoID: this.id,
      repoName: this.name,
      userName: this.owner.login, // git user - comes from owner.login // camelCase
      userLink: this.owner.html_url, // git user's github - comes from owner.html_url
      repoLink: this.html_url, // specific repo's url - comes from html_url
      stars: this.stargazer_count, // option 1 for finding top repos - comes from stargazers_count
      watches: this.watchers_count, // option 2 for finding top repos - comes from watchers_count
      forks: this.forks_count
    }, { upsert: true }, (err) => {
      if (err) console.error(err);
    })
  })
}

module.exports.save = save;