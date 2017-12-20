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


class Post extends Component {

  // had to add setTimeout as this.props.activePost.id wasn't ready when page accessed by back button
  componentDidMount() {
    setTimeout(function() {
      this.props.getPost(this.props.activePostId);
    }.bind(this), 5)
  }

  state = {
    inEditMode: false,
    titleInput: "",
    bodyInput: ""
  }

  enterEditMode = () => {
    this.setState(() => ({
      inEditMode: true,
      titleInput: this.props.activePost.title,
      bodyInput: this.props.activePost.body
    })
    )
  }

  exitEditMode = () => {
    this.setState(() => ({
      inEditMode: false,
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

        {(this.state.inEditMode === false)

        ?
        <div>
        <Link to="/new/post/create"><button>New post</button></Link>
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
    activePost: state.activePost    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePostScore: (direction, id) => dispatch(changePostScore(direction, id)),
    getPost: (id) => dispatch(itemsFetchSinglePost(id)),
    deletePost: (id) => dispatch(deleteExistingPost(id)),
    updatePost: (id, title, body) => dispatch(updateExistingPost(id, title, body))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
