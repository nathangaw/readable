import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {

  render() {

    return (

      <div className="post">
        <h1>Post test</h1>
      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
