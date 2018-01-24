import React, { Component } from 'react';
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
    fetch('https://www.reddit.com/r/programming.json')
      .then(resp => resp.json())
      .then(json => {
        var postArr = [];
        for (var i = 0, len = json.data.children.length; i < len; i++) {
          const p = json.data.children[i];
          postArr.push(p)
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
