import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchComments } from '../actions/index'
import { changePostScore } from '../actions/index'
import { addNewComment } from '../actions/index'
import { changeCommentScore } from '../actions/index'
import { updateExistingComment } from '../actions/index'
import { deleteExistingComment } from '../actions/index'
import { itemsFetchSinglePost} from '../actions/index'
import moment from "moment"
import Modal from 'react-modal'

class Post extends Component {

  componentDidMount() {
    this.props.getPost(this.props.activePostId)
    this.props.fetchComments(this.props.activePostId);
  }

  state = {
    commentModalOpen: false,
    commentInput: "",
    nameInput: "",
    inCommentEditMode: false,
    editCommentId: ""
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true
    })
    )
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
      inCommentEditMode: false
    })
    )
  }

  enterCommentEdit = (commentId, commentBody, commentAuthor) => {
    this.setState(() => ({
      inCommentEditMode: true,
      commentModalOpen: true,
      nameInput: commentAuthor,
      commentInput: commentBody,
      editCommentId: commentId
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
    this.props.addComment(Math.floor(Math.random() * 1000000000), this.state.commentInput, this.state.nameInput, this.props.activePost)
    event.preventDefault();
    this.closeCommentModal();
  }

  commentUpdate = (event) => {    
    this.props.updateComment(this.state.editCommentId, this.state.commentInput)
    event.preventDefault();
    this.closeCommentModal();
  }

  render() {


    return (

      <div className="post">
        <button>Edit post</button>
        <button>Delete post</button>
        <h1>{this.props.activePost.title}</h1>
        <h2>{this.props.url}</h2>
        <p>Votescore: {this.props.activePost.voteScore}</p>
        <button onClick={ () => (this.props.changePostScore('upVote', this.props.activePost)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', this.props.activePost)) }>Decrease score</button>
        <p>By {this.props.activePost.author}</p>
        <p>{ moment(this.props.activePost.timestamp).format('MMMM Do YYYY') }</p>
        <p>{this.props.activePost.body}</p>

        <h4>Comments</h4>
        <button onClick={ () => this.openCommentModal() }>Add new comment</button>
        <p>Number of comments: {this.props.activeComments.length}</p>
        { this.props.activeComments.map( (comment) => (
          <div key={comment.id}>
            <p>{comment.author}{comment.body}{comment.voteScore}</p>
            <button onClick={ () => (this.props.changeCommentScore('upVote', comment.id)) }>Vote up</button>
            <button onClick={ () => (this.props.changeCommentScore('downVote', comment.id)) }>Vote down</button>
            <button onClick={ () => this.enterCommentEdit(comment.id, comment.body, comment.author)}>Edit</button>
            <button onClick={ () => this.props.deleteComment(comment.id)}>Delete</button>
          </div>
        ) ) }


        <Modal
          isOpen={this.state.commentModalOpen}
          contentLabel="Modal"
        >
          <button onClick={ () => this.closeCommentModal()}>Close Modal</button>
          <h1>Add a comment</h1>

          

          
            { (this.state.inCommentEditMode === false)
            ?
            <div>
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
            </div>
            :
            <div>
              <form onSubmit={this.commentUpdate}>
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
            </div>
            }

          
        </Modal>

      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    // need url to populate page if refreshed or accessed directly
    activePostId: state.router.location.pathname.slice(6),
    activeComments: state.activeComments,
    activePost: state.activePost

    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(itemsFetchComments(id)),
    changePostScore: (direction, id) => dispatch(changePostScore(direction, id)),
    changeCommentScore: (direction, id) => dispatch(changeCommentScore(direction, id)),
    addComment: (commentId, body, author, parentId) => dispatch(addNewComment(commentId, body, author, parentId)),
    updateComment: (commentId, body) => dispatch(updateExistingComment(commentId, body)),
    deleteComment: (commentId) => dispatch(deleteExistingComment(commentId)),
    getPost: (id) => dispatch(itemsFetchSinglePost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
