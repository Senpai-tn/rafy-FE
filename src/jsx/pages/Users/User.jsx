import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const User = () => {
  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: {},
  })

  const action = (data) => {
    axios
      .post('')
      .then((response) => {})
      .catch((error) => {})
  }

  return (
    <div>
      <span className="fs-24 font-w800">Ajouter Utilisateur</span>
      <form onSubmit={handleSubmit(action)}>
        <Controller
          control={control}
          name="email"
          rules={{ required: { value: true, message: 'Champs obligatoire' } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-group" style={{ margin: '10px' }}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={value}
                onChange={onChange}
                type="email"
                className="form-control input-rounded"
                placeholder="Email"
              />
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: { value: true, message: 'Champs obligatoire' } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-group" style={{ margin: '10px' }}>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                value={value}
                onChange={onChange}
                type="password"
                className="form-control input-rounded"
                placeholder="Mot de passe"
              />
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
          )}
        />

        <Button variant="contained" type="submit" className="btn btn-primary">
          Ajouter
        </Button>
      </form>
    </div>
  )
}

export default User
