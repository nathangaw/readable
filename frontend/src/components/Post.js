import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePostScore } from '../actions/index'
import { itemsFetchSinglePost} from '../actions/index'
import { deleteExistingPost } from '../actions/index'
import moment from "moment"
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Header from './Header'
import NewPost from './NewPost'
import Comments from './Comments'
import { setTimeout } from 'timers';

class Post extends Component {

  // had to add setTimeout as this.props.activePost.id wasn't ready when page accessed by back button
  componentDidMount() {
    setTimeout(function() {
      this.props.getPost(this.props.activePostId);
    }.bind(this), 5)
    
  }

  state = {
    editPostModalOpen: false
  }


  openEditPostModal = () => {
    this.setState(() => ({
      editPostModalOpen: true
    })
    )
  }

  closeEditPostModal = () => {
    this.setState(() => ({
      editPostModalOpen: false,
      // inCommentEditMode: false,
      // commentInput: "",
      // nameInput: ""
    })
    )
  }

  render() {


    return (

      <div className="post">
        <Header />
        <Link to="/new"><button>New post</button></Link>
        <button onClick={ () => this.openEditPostModal() }>Edit post</button>
        <Link to="/"><button onClick={() => this.props.deletePost(this.props.activePostId)}>Delete post</button></Link>
        <h1>{this.props.activePost.title}</h1>
        <h2>{this.props.url}</h2>
        <p>Votescore: {this.props.activePost.voteScore}</p>
        <button onClick={ () => (this.props.changePostScore('upVote', this.props.activePostId)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', this.props.activePostId)) }>Decrease score</button>
        <p>By {this.props.activePost.author}</p>
        <p>{ moment(this.props.activePost.timestamp).format('MMMM Do YYYY') }</p>
        <p>{this.props.activePost.body}</p>

        <Comments />


        <Modal
          isOpen={this.state.editPostModalOpen}
          contentLabel="EditPostModal"
        >
        <button onClick={ () => this.closeEditPostModal()}>Close Modal</button>
        <NewPost inEditMode="true" editTitle={this.props.activePost.title} editBody={this.props.activePost.body} />

        </Modal>

      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    // need url to populate page if refreshed or accessed directly
    activePostId: state.router.location.pathname.slice(6),
    activePost: state.activePost    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePostScore: (direction, id) => dispatch(changePostScore(direction, id)),
    getPost: (id) => dispatch(itemsFetchSinglePost(id)),
    deletePost: (id) => dispatch(deleteExistingPost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
