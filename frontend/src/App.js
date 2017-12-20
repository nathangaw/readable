import React, { Component } from 'react'
import './App.css'
import CategoryList from './components/CategoryList'
import PostList from './components/PostList'
import Header from './components/Header'
import { Link } from 'react-router-dom'




class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Link to="/new-post"><button className="new-post-button">Add new post</button></Link>
        <div className="lists">
          <CategoryList />
          <PostList />
        </div>

      </div>
    );
  }
}



export default App;
