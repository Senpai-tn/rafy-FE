import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Equipe = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [joueurs, setJoueurs] = useState([])

  const { control, handleSubmit, watch, setError, reset } = useForm({
    defaultValues: location.state
      ? {
          listeJoueurs: location.state.equipe.listeJoueurs.map(
            ({ _id }) => _id
          ),
          nom: location.state.equipe.nom,
        }
      : { listeJoueurs: [], nom: '' },
  })

  const action = (data) => {
    const { nom, listeJoueurs } = data
    if (location.state) {
      axios
        .put('http://127.0.0.1:3698/equipes', {
          id_user: user._id,
          id: location.state.equipe,
          nom,
          listeJoueurs,
        })
        .then(() => {
          Swal.fire('Equipe modifié')
          navigate('/equipes')
        })
    } else {
      axios
        .post('http://127.0.0.1:3698/equipes', {
          id_user: user._id,
          nom,
          listeJoueurs,
        })
        .then(() => {
          Swal.fire('Equipe crée')
          reset({})
        })
    }
  }

  const getListJoueurs = () => {
    axios
      .get('http://127.0.0.1:3698/users', {
        params: { filter: { supprime: null, role: 'JOUEUR' } },
      })
      .then((response) => {
        setJoueurs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getListJoueurs()
  }, [])

  return (
    <Stack alignItems={'center'} width={'100%'} spacing={8}>
      <span className="fs-24 font-w800">Ajouter Equipe</span>
      <form onSubmit={handleSubmit(action)}>
        <Stack width={'500px'} spacing={4} alignItems={'center'}>
          <Controller
            control={control}
            name="nom"
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                onChange={onChange}
                label="Nom de l'équipe"
              />
            )}
          />
          <Controller
            control={control}
            name="listeJoueurs"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl fullWidth>
                <InputLabel id="listeJoueurs">liste des Joueurs</InputLabel>
                <Select
                  multiple
                  labelId="listeJoueurs"
                  id="listeJoueurs"
                  value={value}
                  label="Liste des joueurs"
                  onChange={(event) => {
                    onChange(event.target.value)
                  }}
                  renderValue={(selected) => (
                    <Box>
                      {selected.map((item) => {
                        console.log(selected, item, joueurs)
                        return (
                          <Chip
                            key={item}
                            label={
                              joueurs.find(({ _id }) => _id == item)
                                ? joueurs.find(({ _id }) => _id == item)
                                    .username
                                : ''
                            }
                          />
                        )
                      })}
                    </Box>
                  )}
                >
                  {joueurs.map((e) => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.username}
                    </MenuItem>
                  ))}
                </Select>
                {error && <span style={{ color: 'red' }}>{error.message}</span>}
              </FormControl>
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
  )
}

export default Equipe
