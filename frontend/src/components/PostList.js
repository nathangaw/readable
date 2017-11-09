import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchPosts } from '../actions/index'

class PostList extends Component {



  componentDidMount() {
    this.props.fetchData()
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
        <ul>
          {this.props.posts.map( post => (
            <a key={post.id}><li>{post.title} | {post.timestamp} | {post.voteScore}</li></a>
          ))}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
      posts: state.posts,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(itemsFetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
