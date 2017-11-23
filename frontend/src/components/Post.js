import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchComments } from '../actions/index'

class Post extends Component {

// TODO: if this.props.activePost is null, retrieve post id from URL and set activePost value

  componentDidMount() {
    this.props.fetchComments(this.props.activePost.post.id);
  }

  render() {

    return (

      <div className="post">
        <h1>{this.props.activePost.post.title}</h1>
        <p>Votescore: {this.props.activePost.post.voteScore}</p>
        <p>By {this.props.activePost.post.author}</p>
        <p>{this.props.activePost.post.body}</p>

        <h4>Comments</h4>
        { this.props.activeComments.map( (comment) => (<p>{comment.author}{comment.body}</p>) ) }


      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    activePost: state.activePosts,
    activeComments: state.activeComments,

    // need url to populate page if refreshed or accessed directly
    url: state.router.location.pathname
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(itemsFetchComments(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
