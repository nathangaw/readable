import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewPost } from '../actions/index'
import { itemsFetchCategories } from '../actions/index'
import { Link } from 'react-router-dom'
import '../App.css'
import Header from './Header'


class NewPost extends Component {

  state = {
    titleInput: "",
    bodyInput: "",
    authorInput: "",
    categoryInput: "",
    postSaved: false,
    newPostId: "",
    newCategories: []
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
    
    // create ID for new post   
    let newPostId = Math.floor(Math.random() * 1000000000)

    // add post ID to component state for later reference in UI
    this.setState({newPostId: newPostId})


    // update store and server with new post
    this.props.addPost(newPostId, this.state.titleInput, this.state.bodyInput, this.state.authorInput, this.state.categoryInput)

    this.setState({postSaved: true})

    event.preventDefault()
  }

  componentDidMount() {
    this.props.fetchCategories();
    setTimeout(function(){
      this.updateCategories()
    }.bind(this), 500);
  }

  updateCategories() {
    let newCategories = this.props.categories
    newCategories.unshift({name: "Please choose...", path: "Choose"});
    this.setState({newCategories: newCategories});
  }


  render() {

    return (
      <div>
          <Header />

          {(!this.props.categories.length)
          ? <div>Loading...</div>
          :
          
          <div>
          <p>Create a new post.</p>
          <form onSubmit={this.postSubmit}>
              <label>
                Title: 
                <input className="new-title" placeholder="Post title" type="text" value={this.state.titleInput} onChange={this.titleInput}></input>
              </label><br/>
              <label>
                Post: 
                <input type="text" placeholder="Your post" value={this.state.bodyInput} onChange={this.bodyInput}></input>
              </label><br/>
              <label>
              Author: 
              <input type="text" placeholder="Your name" value={this.state.authorInput} onChange={this.authorInput}></input>
              </label><br/>
              <label>
              Category: 
              <select onChange={this.categoryInput}>
                { this.state.newCategories.map( category => <option key={category.name} value={category.name}>{category.name}</option>
                )}
              
              
              </select>
              </label><br/>
              <input type="submit" value="Submit" />
          </form>
          </div>
          }

          { (this.state.postSaved === true)
          ?
            <div>
            <p>Your post has been saved</p>
            <Link to={this.state.categoryInput + "/" + this.state.newPostId}>View post</Link>
            </div>
          : <p></p>
          }
      





        

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
    addPost: (id, title, body, author, category) => dispatch(addNewPost(id, title, body, author, category)),
    fetchCategories: () => dispatch(itemsFetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
