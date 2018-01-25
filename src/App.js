import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function Post(props) {
  return (
    <div className="post">
      <h3 className="post_title">{props.data.title}</h3>
    </div>
  );
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('https://www.reddit.com/r/programming.json')
      .then(resp => {
        var postArr = [];
        for (var i = 0, len = resp.data.data.children.length; i < len; i++) {
          postArr.push(resp.data.data.children[i]);
        }

        this.setState({
          posts: postArr
        });
      });
  }

  createPosts = () => {
    let content = []

    for (var i = 0; i < this.state.posts.length; i++) {
      content.push(<Post data={this.state.posts[i].data}/>)
    }

    return content
  }

  render() {
    return (
      <div>
        <div>Items:</div>
        {this.createPosts()}
      </div>
    );
  }
}

export default App;
