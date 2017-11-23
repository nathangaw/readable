import React, { Component } from 'react'
import './App.css'
import CategoryList from './components/CategoryList'
import PostList from './components/PostList'
import Header from './components/Header'
import AddPost from './components/AddPost'
import Post from './components/Post'




class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AddPost />
        <CategoryList />
        <PostList />

      </div>
    );
  }
}



export default App;
