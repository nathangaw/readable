import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePostScore, updateExistingPost } from '../actions/index'
import { itemsFetchSinglePost} from '../actions/index'
import { deleteExistingPost } from '../actions/index'
import moment from "moment"
import { Link } from 'react-router-dom'
import Header from './Header'
import Comments from './Comments'
import { setTimeout } from 'timers';
import '../App.css'
import { postEditMode } from '../actions/index'

class Post extends Component {

  // had to add setTimeout as this.props.activePost.id wasn't ready when page accessed by back button
  componentDidMount() {
    setTimeout(function() {
      this.props.getPost(this.props.activePostId);
    }.bind(this), 5);
    if (this.props.inEditMode === true) {
      this.enterEditMode();
    }
  }


  state = {
    titleInput: "",
    bodyInput: ""
  }

  enterEditMode = () => {
    // need to make sure edit mode is true because this function may be called by on-page button
    this.props.editMode(true);
    this.setState(() => ({
      titleInput: this.props.activePost.title,
      bodyInput: this.props.activePost.body
    })
    )
  }

  exitEditMode = () => {
    this.props.editMode(false);
    this.setState(() => ({
      titleInput: "",
      bodyInput: ""
    })
    )
  }

  titleInput = (event) => {
    this.setState({titleInput: event.target.value})
  }

  bodyInput = (event) => {
    this.setState({bodyInput: event.target.value})
  }

  postUpdate = (event) => {
    this.props.updatePost(this.props.activePostId, this.state.titleInput, this.state.bodyInput);
    event.preventDefault();
    this.exitEditMode();
  }

  render() {

    return (

      <div className="post">
        <Header />

        {(this.props.inEditMode === false)

        ?
        <div>
        <Link to="/new-post"><button>New post</button></Link>
        <button onClick={ () => this.enterEditMode() }>Edit post</button>
        <Link to="/"><button onClick={() => this.props.deletePost(this.props.activePostId)}>Delete post</button></Link>
        <h1>{this.props.activePost.title}</h1>
        <h4>By {this.props.activePost.author} | { moment(this.props.activePost.timestamp).format('MMMM Do YYYY') }</h4>
        <p>Votescore: {this.props.activePost.voteScore}</p>
        <button onClick={ () => (this.props.changePostScore('upVote', this.props.activePostId)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', this.props.activePostId)) }>Decrease score</button>
        
        <p>{this.props.activePost.body}</p>
        

        <Comments />
        </div>
        :
        <div>
          {/* Edit mode */}
          <button className="stop-editing-button" type="button" onClick={ () => this.exitEditMode() }>Stop editing</button>
          <form onSubmit={this.postUpdate}>
              <label>
                Title:
                <input type="text" value={this.state.titleInput} onChange={this.titleInput}></input>
              </label><br/>
              <label>
                Post:
                <input type="text" placeholder="Your post" value={this.state.bodyInput} onChange={this.bodyInput}></input>
              </label><br/>
              <input type="submit" value="Save changes" />
          </form>
        </div>
        }

      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    // need url to populate page if refreshed or accessed directly
    activePostId: state.router.location.pathname.substring(state.router.location.pathname.lastIndexOf('/')+1),
    activePost: state.activePost,
    inEditMode: state.postEditMode   
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePostScore: (direction, id) => dispatch(changePostScore(direction, id)),
    getPost: (id) => dispatch(itemsFetchSinglePost(id)),
    deletePost: (id) => dispatch(deleteExistingPost(id)),
    updatePost: (id, title, body) => dispatch(updateExistingPost(id, title, body)),
    editMode: (bool) => dispatch(postEditMode(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
