import React from 'react';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleInputEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleInputPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const savedEmails = JSON.parse(localStorage.getItem("emails")) || [];
    const savedPasswords = JSON.parse(localStorage.getItem("password")) || [];

    const emailExists = savedEmails.includes(email);
    const passwordExists = savedPasswords.includes(password);

    if (!email || !password) {
      alert("Заповніть усі поля");
      return;
    }

    if (!emailExists || !passwordExists) {
      alert("Невірний email або пароль");
      return;
    }

    alert("Успішний вхід");

    localStorage.setItem("isRegistered", true);

    if (this.props.onLoginSuccess) {
      this.props.onLoginSuccess();
    }
  }

  render() {
    return (
      <form>
        <input type="email" placeholder="Email" onChange={this.handleInputEmail} value={this.state.email} />
        <input type="password" placeholder="Password" onChange={this.handleInputPassword} value={this.state.password} />
        <button onClick={this.handleLogin} className="btnSend">Log in</button>
      </form>
    );
  }
}

export default LoginForm;
