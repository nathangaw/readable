import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchCategories } from '../actions/index'

class CategoryList extends Component {



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

      <div className="category-list">
        <h2>Categories</h2>
        <ul>
          {this.props.categories.map( category => (
            <a key={category.name} href={category.path}><li>{category.name}</li></a>
          ))}
        </ul>
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
      fetchData: () => dispatch(itemsFetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
