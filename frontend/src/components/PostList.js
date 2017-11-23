import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchPosts } from '../actions/index'
import { orderByVoteScore } from '../actions/index'
import { orderByDate } from '../actions/index'
import moment from "moment"
import { Link } from 'react-router-dom'

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
        <p onClick={ () => this.props.votescoreSort('descend') }>Sort by descending votescore</p>
        <p onClick={ () => this.props.votescoreSort('ascend') }>Sort by ascending votescore</p>
        <p onClick={ () => this.props.dateSort('descend') }>Sort by descending date</p>
        <p onClick={ () => this.props.dateSort('ascend') }>Sort by ascending date</p>
        <ul>
          { (this.props.filteredPosts.length)
            ? this.props.posts.filter( post => post.category === this.props.filteredPosts ).map( post => (<Link to={"/post/" + post.id} key={post.id}><li>{post.title} | { moment(post.timestamp).format('MMMM Do YYYY') } | {post.voteScore}</li></Link>))
            : this.props.posts.map( post => (
            <Link to={"/post/" + post.id} key={post.id}><li>{post.title} | { moment(post.timestamp).format('MMMM Do YYYY') } | {post.voteScore}</li></Link>))
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
      filteredPosts: state.filteredPosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(itemsFetchPosts()),
      votescoreSort: (direction) => dispatch(orderByVoteScore(direction)),
      dateSort: (direction) => dispatch(orderByDate(direction))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
