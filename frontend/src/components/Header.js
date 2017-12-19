import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Readable.png'

class Header extends Component {

  render() {

    return (
      <div>
        <Link to="/"><img className="logo" src={Logo}/></Link>

      </div>



    )
  }

}


export default Header;
