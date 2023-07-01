import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { fr } from 'date-fns/locale'
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const Match = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [matchs, setMatchs] = useState([])
  const [open, setOpen] = React.useState(false)
  const user = useSelector((state) => state.user)

  const [equipes, setEquipes] = useState([])

  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: location.state
      ? {
          date: location.state.match.date,
          listeEquipes: location.state.match.listeEquipes.map(({ _id }) => _id),
          tournoi: location.state.match.tournoi,
        }
      : { date: null, listeEquipes: [], tournoi: null },
  })

  const getListTournoi = () => {
    axios
      .get('http://127.0.0.1:3698/tournois', {
        params: { filter: { supprime: null } },
      })
      .then((response) => {
        setMatchs(response.data)
      })
  }

  const action = (data) => {
    const { date, listeEquipes, tournoi } = data
    if (listeEquipes.length !== 2) {
      setError('listeEquipes', { message: 'Vous devez choisir 2 équipes' })
    } else {
      if (location.state) {
        axios
          .put('http://127.0.0.1:3698/matchs', {
            id_user: user._id,
            id: location.state.match._id,
            date,
            listeEquipes,
            tournoi,
          })
          .then(() => {
            Swal.fire('Match modifié')
            navigate('/matchs')
          })
      } else
        axios
          .post('http://127.0.0.1:3698/matchs', {
            id_user: user._id,
            date,
            listeEquipes,
            tournoi,
          })
          .then(() => {
            Swal.fire('Match crée')
            reset({})
          })
    }
  }

  const getListEquipes = () => {
    axios
      .get('http://127.0.0.1:3698/equipes', {
        params: { filter: { supprime: null } },
      })
      .then((response) => {
        setEquipes(response.data)
      })
  }

  useEffect(() => {
    getListTournoi()
    getListEquipes()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <Stack alignItems={'center'} width={'100%'} spacing={8}>
        <span className="fs-24 font-w800">Ajouter Match</span>
        <form onSubmit={handleSubmit(action)}>
          <Stack width={'500px'} spacing={4} alignItems={'center'}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Champs obligatoire' },
              }}
              name="tournoi"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <InputLabel id="tournoi">Tournoi</InputLabel>
                  <Select
                    labelId="tournoi"
                    id="tournoi"
                    value={value}
                    label="Tournoi"
                    onChange={(v) => {
                      onChange(v.target.value)
                    }}
                  >
                    {matchs.map((t) => (
                      <MenuItem value={t._id} key={t._id}>
                        {t.libelle}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && (
                    <span style={{ color: 'red' }}>{error.message}</span>
                  )}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="listeEquipes"
              rules={{}}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <InputLabel id="listeEquipes">Equipes</InputLabel>

                  <Select
                    multiple
                    labelId="listeEquipes"
                    id="listeEquipes"
                    value={value}
                    label="Tournois"
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    onChange={(event) => {
                      onChange(event.target.value)
                    }}
                    renderValue={(selected) => (
                      <Box>
                        {selected.map((item) => {
                          return (
                            <Chip
                              key={item}
                              label={
                                equipes.find(({ _id }) => _id == item)
                                  ? equipes.find(({ _id }) => _id == item).nom
                                  : '"'
                              }
                            />
                          )
                        })}
                      </Box>
                    )}
                  >
                    {equipes.map((e) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.nom}
                      </MenuItem>
                    ))}
                  </Select>

                  {error && (
                    <span style={{ color: 'red' }}>{error.message}</span>
                  )}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="date"
              rules={{
                required: { value: true, message: 'Champs obligatoire' },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <DatePicker
                    sx={{
                      m: '10px',

                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        bgcolor: 'rgba(255,255,255,0.11)',
                      },
                    }}
                    value={value ? new Date(value) : null}
                    onChange={onChange}
                    label="Date de début"
                  />

                  {error && (
                    <span style={{ color: 'red' }}>{error.message}</span>
                  )}
                </>
              )}
            />
            <Box>
              <Button
                onClick={() => reset({})}
                variant="outlined"
                sx={{ m: '20px' }}
              >
                Annuler
              </Button>
              <Button variant="outlined" type="submit">
                {location.state ? 'Modifier' : 'Ajouter'}
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </LocalizationProvider>
  )
}

export default Match
