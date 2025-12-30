import React from 'react'
import { Link } from 'react-router-dom'

let NavBar = () => {
  return (
    <React.Fragment>
    <div>
        {/* <nav className="navbar navbar=dark bg-dark navbar-expand-lg"> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    {/* <i className="fa fa-mobile text-warning">Contact <span className="text-warning">Manager</span></i>*/}
                    <i className="fa fa-address-book fa-lg me-2">Contact <span className="text-warning">Manager</span></i>
                </Link>
            </div>
        </nav>
    </div>
    </React.Fragment>
  )
};

export default NavBar;