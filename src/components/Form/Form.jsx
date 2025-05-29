import React from 'react'
import './form.css'
class Form extends React.Component {
    state = {
        passwords: JSON.parse(localStorage.getItem("password")) || [],
        password: "",
        emails: JSON.parse(localStorage.getItem("emails")) || [],
        email: ""
    }
    handleInputEmail = ({ target: { value } }) => {
        this.setState({
            email: value
        })
    }
    handleInputPassword = ({ target: { value } }) => {
        this.setState({
            password: value
        })
    }
    handleSendInfo = async (event) => {
        event.preventDefault()
        const { email, emails, passwords, password } = this.state
        const updateEmail = [...emails, email]
        const updatePassword = [...passwords, password]
        if (!email.includes("@")) {
            alert("Емейл має містити знак @ ")
            return;
        }
        if (password.length !== 8) {
            alert("Пароль має містити 8 симовлів")
            return;
        }
        if (emails.includes(email)) {
            alert("Цей емейл вже зареєстровано");
            return;
        }
        if (!email || !password) {
            alert("Заповніть усі поля");
            return;
        }
        if (emails.includes(email) && passwords.includes(password)) {
            alert("Ці дані існують , заєструйтеся !")
            return;
        }
        this.setState({
            emails: updateEmail,
            passwords: updatePassword,
            email: '',
            password: ''
        })

        localStorage.setItem("password", JSON.stringify(updatePassword))
        localStorage.setItem("emails", JSON.stringify(updateEmail))
     try {
        const response = await fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert("Успішно");
            if (this.props.onRegister) {
                this.props.onRegister(); 
            }
        } else {
            alert("Помилка під час реєстрації");
        }
    } catch (error) {
        alert("Помилка з'єднання: " + error.message);
    }

    }
    componentDidMount() {
        const savedEmails = JSON.parse(localStorage.getItem("emails")) || [];
        const savedPasswords = JSON.parse(localStorage.getItem("password")) || [];

        this.setState({
            emails: savedEmails,
            passwords: savedPasswords
        });
    }
    render() {
        return (
            <form>
                <input type="email" placeholder="Email" onChange={this.handleInputEmail} value={this.state.email} />
                <input type="password" placeholder="Password" onChange={this.handleInputPassword} value={this.state.password} />
                <button onClick={this.handleSendInfo} className="btnSend">Send</button>
            </form>
        )
    }
}
export default Form;