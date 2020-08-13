import React, { Component, Fragment } from 'react'
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
 } from "reactstrap";
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

class AppNavbar extends Component {
    /* constructor(props) {
        super(props)
    
        this.state = {
            isOpen : false
        }
        //this.toggle = this.toggle.bind(this)
    } */

    state = {
        isOpen : false
    }

    static propTypes = {
        auth : PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    
    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : null}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>                
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )


        return (
            <div>
                <Navbar color="light" expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            Shopping List
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar/>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth : state.auth
})

export default connect(mapStateToProps,null)(AppNavbar)
