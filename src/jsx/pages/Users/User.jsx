import { Button, FormLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const User = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: location.state
      ? {
          username: location.state.user.username,
          email: location.state.user.email,
          motPasse: location.state.user.motPasse,
          role: location.state.user.role,
        }
      : {
          username: '',
          email: '',
          motPasse: '',
          role: '',
        },
  })

  const action = (data) => {
    if (location.state)
      axios
        .put('http://127.0.0.1:3698/users', {
          id: location.state.user._id,

          username: data.username,
          email: data.email,
          motPasse: data.motPasse,
          role: data.role,
        })
        .then((response) => {
          Swal.fire('Utilisateur modifié')
          navigate('/users')
        })
        .catch((error) => {})
    else
      axios
        .post('http://127.0.0.1:3698/users', {
          username: data.username,
          email: data.email,
          motPasse: data.motPasse,
          role: 'ORGANISATEUR',
        })
        .then((response) => {
          Swal.fire('Organisateur crée')
          navigate('/users')
        })
        .catch((error) => {
          Swal.fire('Email et username doivent être unique', '', 'error')
        })
  }

  return (
    <div>
      <span className="fs-24 font-w800">Ajouter Utilisateur</span>
      <form onSubmit={handleSubmit(action)}>
        <Controller
          control={control}
          name="username"
          rules={{ required: { value: true, message: 'Champs obligatoire' } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-group" style={{ margin: '10px' }}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={value}
                onChange={onChange}
                type="username"
                className="form-control input-rounded"
                placeholder="Username"
              />
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
          )}
        />
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
        {!location.state && (
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
        )}
        <FormLabel>Rôle</FormLabel>
        <Controller
          name="role"
          control={control}
          rules={{ required: { value: true, message: 'Champs obligatoire' } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Select value={value} onChange={onChange}>
                <MenuItem value={'JOUEUR'}>Joueur</MenuItem>
                <MenuItem value={'STAFF'}>Staff</MenuItem>
                <MenuItem value={'ORGANISATEUR'}>Organisateur</MenuItem>
                <MenuItem value={'ARBITRE'}>Arbitre</MenuItem>
                <MenuItem value={'SUPER_ADMIN'}>Super-Admin</MenuItem>
              </Select>
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </>
          )}
        />
        <br />

        <Button variant="contained" type="submit" className="btn btn-primary">
          Ajouter
        </Button>
      </form>
    </div>
  )
}

export default User
