import React, { Component } from 'react'
import './App.css'
import CategoryList from './components/CategoryList'
import PostList from './components/PostList'
import Header from './components/Header'
import Post from './components/Post'




class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CategoryList />
        <PostList />

      </div>
    );
  }
}



export default App;
