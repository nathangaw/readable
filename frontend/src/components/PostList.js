import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchPosts } from '../actions/index'
import { orderByVoteScore } from '../actions/index'
import { orderByDate } from '../actions/index'
import moment from "moment"
import { Link } from 'react-router-dom'
import { changePostScore } from '../actions/index'
import { deleteExistingPost } from '../actions/index'
import { postEditMode } from '../actions/index'
import { setActivePost } from '../actions/index'

class PostList extends Component {



  componentDidMount() {
    this.props.fetchData();
  }

  render() {

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <div className="post-list">
        <h2>Posts</h2>
        <div className="post-list-buttons">
          <div className="post-vs-buttons">
            <button onClick={ () => this.props.votescoreSort('descend') }>Sort by descending votescore</button>
            <button onClick={ () => this.props.votescoreSort('ascend') }>Sort by ascending votescore</button>
          </div>
          <div className="post-date-buttons">
            <button onClick={ () => this.props.dateSort('descend') }>Sort by descending date</button>
            <button onClick={ () => this.props.dateSort('ascend') }>Sort by ascending date</button>
          </div>
        </div>
        <ul>
          { (this.props.filteredPosts.length)
            ? this.props.posts.filter( post => post.category === this.props.filteredPosts ).map( post => (<div key={post.id}>
            <Link to={"/" + post.category + "/" + post.id} onClick={() => this.props.setActivePost(post.id) } key={post.id}><li className="postlist-items"><span className="postlist-title"><strong>{post.title} by {post.author}</strong> </span><br/><span className="postlist-secondrow"> { moment(post.timestamp).format('MMMM Do YYYY') } | VoteScore:{post.voteScore} </span><br/><span className="postlist-comments"> Comments: {post.commentCount}</span></li></Link>
            <button onClick={ () => (this.props.changePostScore('upVote', post.id)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', post.id)) }>Decrease score</button>
            <Link to={"/" + post.category + "/" + post.id} onClick={() => this.props.editMode(true)}><button>Edit post</button></Link><button onClick={ () => (this.props.deletePost(post.id)) }>Delete post</button>
            </div>
            ))
            : this.props.posts.map( post => (
            <div key={post.id}>
            <Link to={"/" + post.category + "/" + post.id} key={post.id}><li className="postlist-items"><span className="postlist-title"> <strong>{post.title} by {post.author}</strong></span><br/><span className="postlist-secondrow"> { moment(post.timestamp).format('MMMM Do YYYY') } | VoteScore: {post.voteScore}</span><br/><span className="postlist-comments"> Comments: {post.commentCount}</span></li></Link>
            <button onClick={ () => (this.props.changePostScore('upVote', post.id)) }>Increase score</button><button onClick={ () => (this.props.changePostScore('downVote', post.id)) }>Decrease score</button>
            <Link to={"/" + post.category + "/" + post.id} onClick={() => { this.props.editMode(true); this.props.setActivePost(post);}}><button>Edit post</button></Link><button onClick={ () => (this.props.deletePost(post.id)) }>Delete post</button>
            </div>
            ))
          }

        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
      posts: state.posts,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading,
      filteredPosts: state.filteredPosts,
      inEditMode: state.postEditMode 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(itemsFetchPosts()),
      votescoreSort: (direction) => dispatch(orderByVoteScore(direction)),
      dateSort: (direction) => dispatch(orderByDate(direction)),
      changePostScore: (direction, id) => dispatch(changePostScore(direction, id)),
      deletePost: (id) => dispatch(deleteExistingPost(id)),
      editMode: (bool) => dispatch(postEditMode(bool)),
      setActivePost: (post) => dispatch(setActivePost(post))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
