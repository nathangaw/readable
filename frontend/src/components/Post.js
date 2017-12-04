import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchComments } from '../actions/index'
import { changePostScore } from '../actions/index'
import { addNewComment } from '../actions/index'
import { changeCommentScore } from '../actions/index'
import moment from "moment"
import Modal from 'react-modal'

class Post extends Component {

// TODO: if this.props.activePost is null, retrieve post id from URL and set activePost value

  componentDidMount() {
    this.props.fetchComments(this.props.activePost);
  }

  state = {
    commentModalOpen: false,
    commentInput: "",
    nameInput: ""
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true
    })
    )
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false
    })
    )
  }

  commentInput = (event) => {
    this.setState({commentInput: event.target.value})
  }

  nameInput = (event) => {
    this.setState({nameInput: event.target.value})
  }

  commentSubmit = (event) => {
    console.log(this.state.commentInput);
    console.log(this.state.nameInput);
    
    this.props.addComment(Math.floor(Math.random() * 1000000000), this.state.commentInput, this.state.nameInput, this.props.activePost)
    event.preventDefault();
    this.closeCommentModal();
    alert('Thanks for your comment');
  }

  render() {


    return (

      <div className="post">
        <button>Edit post</button>
        <button>Delete post</button>
        <h1>{this.props.posts[0].title}</h1>
        <h2>{this.props.url}</h2>
        <p>Votescore: {this.props.posts[0].voteScore}</p>
        <button onClick={ () => (this.props.changePostScore('upVote', this.props.activePost)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', this.props.activePost)) }>Decrease score</button>
        <p>By {this.props.posts[0].author}</p>
        <p>{ moment(this.props.posts[0].timestamp).format('MMMM Do YYYY') }</p>
        <p>{this.props.posts[0].body}</p>

        <h4>Comments</h4>
        <button onClick={ () => this.openCommentModal() }>Add new comment</button>
        <p>Number of comments: {this.props.posts[0].commentCount}</p>
        { this.props.activeComments.map( (comment) => (<div><p key={comment.id}>{comment.author}{comment.body}{comment.voteScore}</p><button onClick={ () => (this.props.changeCommentScore('upVote', comment.id)) }>Vote up</button><button onClick={ () => (this.props.changeCommentScore('downVote', comment.id)) }>Vote down</button><button>Edit</button><button>Delete</button></div>) ) }


        <Modal
          isOpen={this.state.commentModalOpen}
          // onRequestClose={this.closeCommentModal}
          contentLabel="Modal"
        >
          <button onClick={ () => this.closeCommentModal()}>Close Modal</button>
          <h1>Add a comment</h1>

          <form onSubmit={this.commentSubmit}>
            <label>
              Your comment:
              <input type="text" value={this.state.commentInput} onChange={this.commentInput}></input>
            </label>
            <label>
              Your name:
              <input type="text" placeholder="Your name" value={this.state.nameInput} onChange={this.nameInput}></input>
            </label>
        
          <input type="submit" value="Submit" />
          </form>
        </Modal>

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
    changePostScore: (direction, id) => dispatch(changePostScore(direction, id)),
    changeCommentScore: (direction, id) => dispatch(changeCommentScore(direction, id)),
    addComment: (commentId, body, author, parentId) => dispatch(addNewComment(commentId, body, author, parentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
