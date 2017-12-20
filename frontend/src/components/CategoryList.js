import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchCategories } from '../actions/index'
import { filterPosts } from '../actions/index'
import { Link } from 'react-router-dom'

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
        { (this.props.filteredPostsList !== false)
          ? <div>
              <button className="filter-button" onClick={ () => this.props.filteredPosts(false) }>Show all categories</button>
              {this.props.categories.filter( category => category.name === this.props.filteredPostsList).map( category => (
                <li onClick={ () => this.props.filteredPosts(category.name) } key={category.name}>{category.name}</li>
              ))}
            </div>

          : <div>
              <ul className="category-list">
                {this.props.categories.map( category => (
                  <Link key={category.name} to={"/" + category.name}><li onClick={ () => this.props.filteredPosts(category.name) } >{category.name}</li></Link>
                ))}
              </ul>
             </div>
        }
        
      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
      categories: state.categories,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading,
      filteredPostsList: state.filteredPosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(itemsFetchCategories()),
      filteredPosts: (category) => dispatch(filterPosts(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
