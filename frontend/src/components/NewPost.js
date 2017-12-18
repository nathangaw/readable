import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewPost } from '../actions/index'
import { Link } from 'react-router-dom'

class NewPost extends Component {

  state = {
    titleInput: "",
    bodyInput: "",
    authorInput: "",
    categoryInput: this.props.categories[0].name
  }

  titleInput = (event) => {
    this.setState({titleInput: event.target.value})
  }

  bodyInput = (event) => {
    this.setState({bodyInput: event.target.value})
  }

  authorInput = (event) => {
    this.setState({authorInput: event.target.value})
  }

  categoryInput = (event) => {
    this.setState({categoryInput: event.target.value})
  }

  postSubmit = (event) => {    
    this.props.addPost(Math.floor(Math.random() * 1000000000), this.state.titleInput, this.state.bodyInput, this.state.authorInput, this.state.categoryInput)
    event.preventDefault();
  }

  render() {

    return (
      <div>
          <Link to="/">Home page</Link>

          //TODO: add ternary to check if in edit mode and render different forms

          <form onSubmit={this.postSubmit}>
              <label>
                Title:
                <input type="text" value={this.state.titleInput} onChange={this.titleInput}></input>
              </label>
              <label>
                Post:
                <input type="text" placeholder="Your post" value={this.state.bodyInput} onChange={this.bodyInput}></input>
              </label>
              <label>
              Author:
              <input type="text" placeholder="Your name" value={this.state.authorInput} onChange={this.authorInput}></input>
              </label>
              <label>
              Category:
              <select value={this.state.categoryInput} onChange={this.categoryInput}>
                { this.props.categories.map( category => <option key={category.name} value={category.name}>{category.name}</option>
                )}
              
              
              </select>
              </label>
              <input type="submit" value="Submit" />
          </form>
      





        

      </div>



    )
  }

}

const mapStateToProps = (state) => {
  return {
      categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    addPost: (id, title, body, author, category) => dispatch(addNewPost(id, title, body, author, category))
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
