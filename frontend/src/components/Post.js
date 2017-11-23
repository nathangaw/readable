import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {

  render() {

    return (

      <div className="post">
        <h1>{this.props.activePost.post.title}</h1>
        <p>Votescore: {this.props.activePost.post.voteScore}</p>
        <p>By {this.props.activePost.post.author}</p>
        <p>{this.props.activePost.post.body}</p>

      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    activePost: state.activePosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
