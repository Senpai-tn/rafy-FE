import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  loadingToggleAction,
  loginAction,
} from '../../store/actions/AuthActions'

// image
import logo from '../../images/logo-white.png'
import logoWhite from '../../images/logo-whiite-text.png'
import loginbg from '../../images/bg-login.jpg'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import actions from '../../redux/actions'

function Login(props) {
  const dispatch = useDispatch()
  const { control, handleSubmit, setError } = useForm({
    defaultValues: { email: '', motPasse: '', remember: true },
  })

  function onLogin(data) {
    axios
      .post('http://127.0.0.1:3698/users/login', data)
      .then((response) => {
        dispatch({ type: actions.auth, user: response.data })
        data.remember &&
          localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((error) => {
        if (error.response.data === 'EMAIL_NOT_FOUND') {
          setError('email', { message: 'Email incorrecte' })
        }
        if (error.response.data === 'DELETED_USER') {
          setError('email', { message: 'compte supprimé' })
        }
        if (error.response.data === 'INVALID_PASSWORD') {
          setError('motPasse', { message: 'Mot de passe incorrecte' })
        }
      })
  }

  return (
    <div
      className="login-main-page"
      style={{ backgroundImage: 'url(' + loginbg + ')' }}
    >
      <div className="login-wrapper">
        <div className="login-aside-left">
          <Link to={'#'} className="login-logo">
            <img src={logo} alt="" width="50px" />
            <img src={logoWhite} alt="" className="ms-3" />
          </Link>
          <div className="login-description">
            <h2 className="main-title mb-2">Welcome To Invome</h2>
            <p className="">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters,
            </p>
            <ul className="social-icons mt-4">
              <li>
                <Link to={'#'}>
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to={'#'}>
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to={'#'}>
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </li>
            </ul>
            <div className="mt-5 bottom-privacy">
              <Link to={'#'} className="mr-4">
                Privacy Policy
              </Link>
              <Link to={'#'} className="mr-4">
                Contact
              </Link>
              <Link to={'#'} className="">
                © 20222 DexignLab
              </Link>
            </div>
          </div>
        </div>
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="p-5">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form-1">
                      <div className="mb-4">
                        <h3 className="dz-title mb-1">Sign in</h3>
                        <p className="">
                          Sign in by entering information below
                        </p>
                      </div>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={handleSubmit(onLogin)}>
                        <Controller
                          control={control}
                          name="email"
                          rules={{
                            required: {
                              value: true,
                              message: 'Champs Email est obligatoire',
                            },
                          }}
                          render={({
                            field: { value, onChange },
                            fieldState: { error },
                          }) => (
                            <div className="form-group">
                              <label className="mb-2 ">
                                <strong>Email</strong>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                value={value}
                                onChange={onChange}
                                placeholder="Type Your Email Address"
                              />
                              {error && (
                                <span style={{ color: 'red' }}>
                                  {error.message}
                                </span>
                              )}
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="motPasse"
                          rules={{
                            required: {
                              value: true,
                              message: 'Champs Mot de passe est obligatoire',
                            },
                          }}
                          render={({
                            field: { value, onChange },
                            fieldState: { error },
                          }) => (
                            <div className="form-group">
                              <label className="mb-2 ">
                                <strong>Password</strong>
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                value={value}
                                placeholder="Type Your Password"
                                onChange={onChange}
                              />
                              {error && (
                                <span style={{ color: 'red' }}>
                                  {error.message}
                                </span>
                              )}
                            </div>
                          )}
                        />
                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                          <Controller
                            control={control}
                            name="remember"
                            render={({ field: { value, onChange } }) => (
                              <div className="form-group">
                                <div className="form-check custom-checkbox ml-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="basic_checkbox_1"
                                    onChange={onChange}
                                    value={value}
                                    checked={value}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                  >
                                    Remember my preference
                                  </label>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-2">
                        <p className="">
                          Don't have an account?{' '}
                          <Link className="text-primary" to="./register">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
