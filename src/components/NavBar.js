import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {
    render() {
        return (
            <header>
                <div id="main-header" className='container'>
                    <div id="main-links">
                        <NavLink exact to="/" activeClassName="active">Transactions</NavLink>
                        <NavLink exact to="/operations" activeClassName="active">Operations</NavLink>
                        <NavLink exact to="/breakdown" activeClassName="active">Breakdown</NavLink>
                    </div>
                    <span className='balance'>Your Balance: ${this.props.balance} </span>
                </div>
            </header>
        )
    }
}

export default NavBar