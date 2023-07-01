import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// image
import logo from '../../images/logo-full.png'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import actions from '../../redux/actions'

function Register(props) {
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      username: '',
      email: '',
      motPasse: '',
    },
  })
  const dispatch = useDispatch()

  function onSignUp(data) {
    const { username, email, motPasse } = data
    axios
      .post('http://127.0.0.1:3698/users', {
        username,
        email,
        motPasse,
        role: 'JOUEUR',
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch({ type: actions.auth, user: response.data })
      })
  }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>

                    <form onSubmit={handleSubmit(onSignUp)}>
                      <Controller
                        control={control}
                        name="username"
                        rules={{
                          required: {
                            value: true,
                            message: 'Champs usarname obligatoire',
                          },
                        }}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <div className="form-group mb-3">
                            <label className="mb-1 ">
                              <strong>Username</strong>
                            </label>
                            <input
                              value={value}
                              onChange={onChange}
                              type="text"
                              className="form-control"
                              placeholder="username"
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
                        name="email"
                        rules={{
                          required: {
                            value: true,
                            message: 'Champs email obligatoire',
                          },
                        }}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <div className="form-group mb-3">
                            <label className="mb-1 ">
                              <strong>Email</strong>
                            </label>
                            <input
                              type="email"
                              value={value}
                              onChange={onChange}
                              className="form-control"
                              placeholder="email"
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
                            message: 'Champs mot de passe obligatoire',
                          },
                        }}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <div className="form-group mb-3">
                            <label className="mb-1 ">
                              <strong>Password</strong>
                            </label>
                            <input
                              type="password"
                              value={value}
                              onChange={onChange}
                              className="form-control"
                              placeholder="password"
                            />
                            {error && (
                              <span style={{ color: 'red' }}>
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                      />

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{' '}
                        <Link className="text-primary" to="/">
                          Sign in
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
  )
}

export default Register
