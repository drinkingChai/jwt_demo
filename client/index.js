import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import store, { signIn, signOut, loadUserData, getData } from './store'

if (localStorage['jwtDemo']) {
  store.dispatch(loadUserData(localStorage['jwtDemo']))
}

class App extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  handleLogin = ev => {
    ev.preventDefault()
    store.dispatch(signIn(this.state))
  }

  handleLogout = ev => {
    ev.preventDefault()
    store.dispatch(signOut())
  }

  render() {
    return (
      <form>
        <TextField
          id='email'
          label='E-mail'
          type='email'
          value={ this.state.email }
          onChange={ this.handleChange('email') }
          margin='normal' />
        <br/>
        <TextField
          id='password'
          label='Password'
          type='password'
          value={ this.state.password }
          onChange={ this.handleChange('password') }
          margin='normal' />
        <br/>
        <Button raised color='primary' onClick={ this.handleLogin }>Sign In</Button>
        <Button raised color='accent' onClick={ this.handleLogout }>Sign Out</Button>
        <Button raised color='default' onClick={ () => store.dispatch(getData()) }>Get Data</Button>
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)