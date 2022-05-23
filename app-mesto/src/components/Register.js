import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as userAuth from '../utils/userAuth';
import './styles/Register.css';
import InfoTooltip from './InfoTooltip';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.password) {
      const { email, password } = this.state;
      userAuth.register(email, password).then((res) => {
        console.log(res)
        if(res._id) {
          this.setState ({
            message: 'Success'
          }, () => {
            this.props.onPopupOpen();
            const timer = setTimeout(()=>{
              this.props.onClose()
              this.props.history.push('/sign-in')
            }, 4000)
            return () => clearTimeout(timer)
          })
        } else {
          this.setState({
            message: 'Error'
          }, () => {
            this.props.onPopupOpen();
            const timer = setTimeout(()=>{
              this.props.onClose()
            }, 4000);
            return () => clearTimeout(timer)
          })
        }
      });
    }
  }

  render() {
    return (
      <div className='register'>
        <h2 className='register__title'>Регистрация</h2>
        <form className="register__form" onSubmit={this.handleSubmit}>
          <input 
            className='register__input' 
            id="email" 
            name="email" 
            type="email" 
            placeholder='Email' 
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            className='register__input' 
            id='password' 
            name='password' 
            type='password' 
            placeholder='Пароль' 
            value={this.state.password} 
            onChange={this.handleChange}
          />
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__login-link">Войти</Link>
        </div>
        <InfoTooltip isOpen={this.props.isOpen} onClose={this.props.onClose} message={this.state.message} />
      </div>
    );
  }
}

export default withRouter(Register);