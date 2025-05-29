import React, { Fragment } from 'react'
import './header.css'
import Modal from '../Modal/Modal'
import logo from '../../images/logo.svg'
class Header extends React.Component {
    state = {
        isModalShow: false,
        isLogin: false,
        isRegistered: false
    }
  handleModalShow = () => {
    this.setState({
        isModalShow: true,
        isLogin: false
    });
}
    handleCloseModal = () => {
        this.setState({
            isModalShow: false
        })
    }
   handleShowLogin = () => {
    this.setState({
        isModalShow: true,
        isLogin: true
    });
}

    handleRegister = () => {
        this.setState({
            isModalShow: false,
            isRegistered: true
        });
        localStorage.setItem("isRegistered", true);
    }
    handleLogout = () => {
    this.setState({ isRegistered: false });
    localStorage.removeItem("isRegistered");
}
    componentDidMount() {
        const isRegistered = JSON.parse(localStorage.getItem("isRegistered")) || false;
        this.setState({ isRegistered });
    }
    render() {
        return (
            <Fragment>
                <header>
                    {this.state.isModalShow && (
                        <Modal closeModal={this.handleCloseModal} login={this.state.isLogin} loginModal={this.handleShowLogin} onRegister={this.handleRegister} />
                    )}
                    <nav>
                        <ul className="list">
                            <li className="item">
                                <img src={logo} alt="logo-header" />
                            </li>
                            <li className="item">Home</li>
                            <li className="item">Shop</li>
                            <li className="item">Blog</li>
                            <li className="item">Sale</li>
                            <li className="item">Contact us</li>
                            {this.state.isRegistered ? (
                                <div className="account-info">
                                    <li className="item">ACCOUNT</li>
                                    <button onClick={this.handleLogout} className="account-button">Log out</button>
                                </div>
                            ) : (
                                <>
                                    <button onClick={this.handleModalShow} className="account-button">
                                        <li className="item">SIGN IN</li>
                                    </button>
                                    <button onClick={this.handleShowLogin} className="account-button">
                                        <li className="item">CREATE AN ACCOUNT</li>
                                    </button>
                                </>
                            )}
                        </ul>
                    </nav>
                </header>
            </Fragment>
        )
    }
}
export default Header;