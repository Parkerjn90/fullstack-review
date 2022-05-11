import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // get repos Username is term searched from git api
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: term,
      success: function() {alert('successful search')},
      error: function(err) {console.log(err)},
    })
  }
  // get request later????
  // fetch() // not sure what goes here
  //   // wait for them to return
  //   .then(results => {
  //     // setState to current state plus new set of repos
  //     this.setState ({repos: this.state.repos.concat(results)})
  //   }).catch(err => {
  //     // catch errors
  //     console.error(err);
  //     alert.('username does not exist, try another')
  //   })

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));