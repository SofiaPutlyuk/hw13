import React, { Fragment } from "react";
import './modal.css'
import { IoCloseSharp } from "react-icons/io5";
import Form from '../Form/Form'
import LoginForm from '../Login/Login';
class Modal extends React.Component {

    componentDidMount() {
        const searchModal = document.getElementById("modal")
        if (searchModal) {
            searchModal.classList.add("show")
        }
    }
    componentWillUnmount() {
        const searchModal = document.getElementById("modal")
        if (searchModal) {
            searchModal.classList.remove("show")
        }
    }
    componentDidUpdate(prevProps) {
        const searchModal = document.getElementById("modal")
        const searchLoginModal = document.getElementById("loginModal")
        if (prevProps.login !== this.props.login) {
            if (this.props.login) {
                searchLoginModal?.classList.add("show")
                searchModal?.classList.remove("show")
            } else {
                searchLoginModal?.classList.remove("show")
                searchModal?.classList.add("show")
            }
        }
    }
    render() {
        return (
            <Fragment>
                <div className="overlay">
                    <div className="modal" id="modal">
                        <button onClick={this.props.closeModal} className="close-btn"><IoCloseSharp /></button>
                        <p className="text-sign">Sign in</p>
                        <Form closeModal={this.props.closeModal} onRegister={this.props.onRegister} />
                        <button onClick={this.props.loginModal} className="btnCreateAccount">create an account</button>
                    </div>
                    <div className="loginModal" id="loginModal">
                        <button onClick={this.props.closeModal} className="close-btn"><IoCloseSharp /></button>
                        <p className="text-sign">Login</p>
                        <LoginForm onLoginSuccess={this.props.onRegister} />
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Modal;