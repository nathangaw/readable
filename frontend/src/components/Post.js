import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchComments } from '../actions/index'
import { changePostScore } from '../actions/index'
import moment from "moment"

class Post extends Component {

// TODO: if this.props.activePost is null, retrieve post id from URL and set activePost value

  componentDidMount() {
    this.props.fetchComments(this.props.activePost);
  }

  render() {


    return (

      <div className="post">
        <button>Edit post</button><button>Delete post</button>
        <h1>{this.props.posts[0].title}</h1>
        <h2>{this.props.url}</h2>
        <p>Votescore: {this.props.posts[0].voteScore}</p>
        <button onClick={ () => (this.props.changePostScore('upVote', this.props.activePost)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', this.props.activePost)) }>Decrease score</button>
        <p>By {this.props.posts[0].author}</p>
        <p>{ moment(this.props.posts[0].timestamp).format('MMMM Do YYYY') }</p>
        <p>{this.props.posts[0].body}</p>

        <h4>Comments</h4>
        <button>Add new comment</button>
        <p>Number of comments: {this.props.posts[0].commentCount}</p>
        { this.props.activeComments.map( (comment) => (<p key={comment.id}>{comment.author}{comment.body}{comment.voteScore}</p>) ) }


      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    // need url to populate page if refreshed or accessed directly
    activePost: state.router.location.pathname.slice(6),
    // activePost: state.activePosts,
    activeComments: state.activeComments,
    posts: state.posts.filter( post => post.id == state.router.location.pathname.slice(6) )

    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(itemsFetchComments(id)),
    changePostScore: (direction, id) => dispatch(changePostScore(direction, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
