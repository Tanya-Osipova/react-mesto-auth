import React from 'react';
import { withRouter } from 'react-router-dom';
import * as userAuth from '../utils/userAuth';
import './styles/Login.css';
import InfoTooltip from './InfoTooltip';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
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

  handleSubmit(e){
    e.preventDefault()
    if (!this.state.email || !this.state.password){
      return;
    }

    userAuth.authorize(this.state.email, this.state.password)
    .then((data) => {
      if (data.token){
        this.setState({
          email: '', 
          password: ''
        } ,() => {
          this.props.handleLogin(e);
          this.props.history.push('/');
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
    })
    .catch(err => console.log(err));  
  }

  render(){
    return(
      <div className="login">
        <h2 className='login__title'>Вход</h2>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <input 
            className='login__input' 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder='Email'
            value={this.state.email} 
            onChange={this.handleChange} 
          />
          <input 
            className='login__input' 
            id="password" 
            name="password" 
            type="password" 
            required 
            placeholder='Пароль'
            value={this.state.password} 
            onChange={this.handleChange} 
          />
          <button type="submit" className="login__link">Войти</button>
        </form>
        <InfoTooltip isOpen={this.props.isOpen} onClose={this.props.onClose} message={this.state.message} />
      </div>
    )
  }
}

export default withRouter(Login); 