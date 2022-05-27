import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const {login} = props;
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const isDisabled = () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const button = document.getElementById('submitCredentials');
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    const trimmedUser = username.value.trim();
    const trimmedPass = password.value.trim();
    if (trimmedUser.length >= 3 && trimmedPass.length >= 8) {
      return button.disabled = false;
    } else {
      return button.disabled = true;
    }
  }

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value });
    isDisabled();
  }

  const onSubmit = evt => {
    evt.preventDefault()

    // ✨ implement

    const username = values.username;
    const password = values.password;
    login(username, password);
  }

 
  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={true} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
