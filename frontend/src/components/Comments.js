import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchComments } from '../actions/index'
import { addNewComment } from '../actions/index'
import { changeCommentScore } from '../actions/index'
import { updateExistingComment } from '../actions/index'
import { deleteExistingComment } from '../actions/index'
import moment from "moment"
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

class Comments extends Component {
    
      // had to add setTimeout as this.props.activePost.id wasn't ready when page accessed by back button
      componentDidMount() {
        setTimeout(function() {
          this.props.fetchComments(this.props.activePostId);
        }.bind(this), 5)
        
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
          inCommentEditMode: false,
          commentInput: "",
          nameInput: ""
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
        this.props.addComment(Math.floor(Math.random() * 1000000000), this.state.commentInput, this.state.nameInput, this.props.activePostId)
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
    
          <div className="comments">
            <h2>Comments</h2>
            <p>Number of comments: {this.props.activeComments.length}</p>
            <button onClick={ () => this.openCommentModal() }>Add new comment</button>
            { this.props.activeComments.map( (comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.body}</p>
                <p>Posted by: {comment.author} | VoteScore: {comment.voteScore}</p>
                <div className="comment-vote-buttons">
                    <button className="comment-button" onClick={ () => (this.props.changeCommentScore('upVote', comment.id)) }>Vote up</button>
                    <button className="comment-button" onClick={ () => (this.props.changeCommentScore('downVote', comment.id)) }>Vote down</button>
                </div>
                <div className="comment-edit-buttons">
                    <button className="comment-button" onClick={ () => this.enterCommentEdit(comment.id, comment.body, comment.author)}>Edit</button>
                    <button className="comment-button" onClick={ () => this.props.deleteComment(comment.id)}>Delete</button>
                    
                </div>
                <hr/>
              </div>
            ) ) }
    
    
            <Modal
              isOpen={this.state.commentModalOpen}
              contentLabel="Modal"
            >
              <button onClick={ () => this.closeCommentModal()}>Close window</button>
              
    
              
    
              
                { (this.state.inCommentEditMode === false)
                ?
                <div>
                  <h1>Add a comment</h1>
                  <form onSubmit={this.commentSubmit}>
                  <label>
                    Your comment:
                    <input type="text" placeholder="Your comment" value={this.state.commentInput} onChange={this.commentInput}></input>
                  </label><br/>
                  <label>
                    Your name:
                    <input type="text" placeholder="Your name" value={this.state.nameInput} onChange={this.nameInput}></input>
                  </label><br/>
                  <input type="submit" value="Submit" />
              </form>
                </div>
                :
                <div>
                  <h1>Edit your comment</h1>
                  <form onSubmit={this.commentUpdate}>
                  <label>
                    Your comment:
                    <input type="text" value={this.state.commentInput} onChange={this.commentInput}></input>
                  </label><br/>
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
        changeCommentScore: (direction, id) => dispatch(changeCommentScore(direction, id)),
        addComment: (commentId, body, author, parentId) => dispatch(addNewComment(commentId, body, author, parentId)),
        updateComment: (commentId, body) => dispatch(updateExistingComment(commentId, body)),
        deleteComment: (commentId) => dispatch(deleteExistingComment(commentId)),
      };
    };
    
    export default connect(mapStateToProps, mapDispatchToProps)(Comments);