import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Action = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [matchs, setMatchs] = useState([])

  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      match: location.state ? location.state.tournoi.match : null,
      type: location.state ? location.state.tournoi.type : null,
      temps: location.state ? location.state.tournoi.temps : null,
    },
  })

  const action = (data) => {
    const { match, type, temps } = data
    if (location.state) {
      axios
        .put('http://127.0.0.1:3698/actions', {
          id: location.state.tournoi._id,
          match,
          type,
          temps,
        })
        .then((response) => {
          Swal.fire('Tournoi modifié')
          navigate('/tournois')
        })
    } else {
      axios
        .post('http://127.0.0.1:3698/actions', {
          match,
          type,
          temps,
        })
        .then(() => {
          Swal.fire('Action crée')
          reset({})
        })
    }
  }

  const getListMatch = () => {
    axios
      .get('http://127.0.0.1:3698/matchs', {
        params: { filter: { supprime: null } },
      })
      .then((response) => {
        setMatchs(response.data)
      })
  }

  useEffect(() => {
    getListMatch()
  }, [])
  return (
    <div>
      <span className="fs-24 font-w800">Ajouter Action</span>
      <form onSubmit={handleSubmit(action)}>
        <Controller
          control={control}
          name="match"
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <InputLabel id="match">Match</InputLabel>
              <Select
                labelId="match"
                id="match"
                value={value}
                label="Match"
                onChange={(v) => {
                  onChange(v.target.value)
                }}
              >
                {matchs.map((m) => (
                  <MenuItem value={m._id} key={m._id}>
                    {dayjs(m.date).format('DD-MM-YYYY') +
                      ' les équipes : ' +
                      m.listeEquipes.map((v) => {
                        return v.nom + '  '
                      })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="type"
          rules={{ required: { value: true, message: 'Champs obligatoire' } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-group" style={{ margin: '10px' }}>
              <label htmlFor="type">Type d'action</label>
              <input
                id="type"
                value={value}
                onChange={onChange}
                type="text"
                className="form-control input-rounded"
                placeholder="Type d'action"
              />
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
          )}
        />
        <Controller
          control={control}
          name="temps"
          rules={{ required: { value: true, message: 'Champs obligatoire' } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="form-group" style={{ margin: '10px' }}>
              <label htmlFor="temps">Temps</label>
              <input
                id="temps"
                value={value}
                onChange={onChange}
                type="text"
                className="form-control input-rounded"
                placeholder="Temps"
              />
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
          )}
        />

        <Button variant="contained" type="submit" className="btn btn-primary">
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default Action
