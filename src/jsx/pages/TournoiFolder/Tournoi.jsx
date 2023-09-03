import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import { fr } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const Tournoi = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [staffList, setStaffList] = useState([])
  const getStaff = () => {
    axios
      .get('http://127.0.0.1:3698/users', {
        params: { filter: { supprime: null, role: 'STAFF' } },
      })
      .then((response) => {
        setStaffList(response.data)
      })
  }
  const { control, handleSubmit, setError, reset, watch } = useForm({
    defaultValues: {
      libelle: location.state ? location.state.tournoi.libelle : '',
      type: location.state ? location.state.tournoi.type : '',
      startDate: location.state ? location.state.tournoi.startDate : null,
      endDate: location.state ? location.state.tournoi.endDate : null,
      staff: location.state ? location.state.tournoi.staff._id : null,
    },
  })

  const action = (data) => {
    const { libelle, type, startDate, endDate, staff } = data
    if (location.state) {
      axios
        .put('http://127.0.0.1:3698/tournois', {
          id: location.state.tournoi._id,
          libelle,
          type,
          startDate,
          endDate,
          staff: staff,
        })
        .then((response) => {
          Swal.fire('Tournoi modifié')
          navigate('/tournois')
        })
    } else {
      axios
        .post('http://127.0.0.1:3698/tournois', {
          libelle,
          type,
          startDate,
          endDate,
          staff: staff,
        })
        .then(() => {
          Swal.fire('Tournoi crée')
          reset({})
        })
    }
  }

  useEffect(() => {
    getStaff()
  }, [])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <div>
        <span className="fs-24 font-w800">Ajouter Tournoi</span>
        <form onSubmit={handleSubmit(action)}>
          <Controller
            control={control}
            name="libelle"
            rules={{ required: { value: true, message: 'Champs obligatoire' } }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="form-group" style={{ margin: '10px' }}>
                <label htmlFor="libelle">Libelle</label>
                <input
                  id="libelle"
                  value={value}
                  onChange={onChange}
                  type="text"
                  className="form-control input-rounded"
                  placeholder="libelle"
                />
                {error && <span style={{ color: 'red' }}>{error.message}</span>}
              </div>
            )}
          />
          <Controller
            control={control}
            name="type"
            rules={{ required: { value: true, message: 'Champs obligatoire' } }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="form-group" style={{ margin: '10px' }}>
                <label htmlFor="type">Type</label>
                <input
                  id="type"
                  value={value}
                  onChange={onChange}
                  type="text"
                  className="form-control input-rounded"
                  placeholder="type"
                />
                {error && <span style={{ color: 'red' }}>{error.message}</span>}
              </div>
            )}
          />
          <Controller
            control={control}
            name="staff"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl fullWidth>
                <InputLabel id="staff">liste des staff</InputLabel>
                <Select
                  labelId="staff"
                  id="staff"
                  value={value}
                  label="Liste des staff"
                  onChange={(event) => {
                    onChange(event.target.value)
                  }}
                >
                  {staffList.map((e) => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.username}
                    </MenuItem>
                  ))}
                </Select>
                {error && <span style={{ color: 'red' }}>{error.message}</span>}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="startDate"
            rules={{ required: { value: true, message: 'Champs obligatoire' } }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <DatePicker
                  sx={{
                    m: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      bgcolor: 'rgba(255,255,255,0.11)',
                    },
                  }}
                  minDate={new Date()}
                  maxDate={watch('endDate')}
                  value={value ? new Date(value) : null}
                  onChange={onChange}
                  label="Date de début"
                />
                {error && <span style={{ color: 'red' }}>{error.message}</span>}
              </>
            )}
          />
          <Controller
            control={control}
            name="endDate"
            rules={{ required: { value: true, message: 'Champs obligatoire' } }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <DatePicker
                  sx={{
                    m: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      bgcolor: 'rgba(255,255,255,0.11)',
                    },
                  }}
                  minDate={watch('startDate')}
                  value={value ? new Date(value) : null}
                  onChange={onChange}
                  label="Date de fin"
                />
                {error && <span style={{ color: 'red' }}>{error.message}</span>}
              </>
            )}
          />
          <Button variant="contained" type="submit" className="btn btn-primary">
            Ajouter
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  )
}

export default Tournoi
