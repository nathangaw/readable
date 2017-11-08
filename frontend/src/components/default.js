import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchData } from '../actions/index'

class DefaultView extends Component {



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
      <div>
        <h1 className="view-title">Home</h1>
          <div className="home-wrapper">
            <div className="category-list">
              <h2>Categories</h2>
              <ul>
                {this.props.categories.map( category => (
                  <a key={category.name} href={category.path}><li>{category.name}</li></a>
                ))}
              </ul>
            </div>
            <div className="post-list">
              <h2>Posts</h2>
              <ul>

              </ul>

            </div>
          </div>
      </div>



    )
  }

}

const mapStateToProps = (state) => {
  return {
      categories: state.categories,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(itemsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
