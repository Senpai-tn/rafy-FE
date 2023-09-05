import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FilteringTable from '../../components/table/FilteringTable/FilteringTable'
import { ColumnFilter } from '../../components/table/FilteringTable/ColumnFilter'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ListeMatchs = () => {
  const [matchs, setMatchs] = useState([])
  const [selected, setSelected] = useState(null)
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const getListTournoi = () => {
    axios
      .get('http://127.0.0.1:3698/matchs', {
        params: { filter: { supprime: null } },
      })
      .then((response) => {
        setMatchs(response.data)
      })
  }
  const { user } = useSelector((state) => state)

  useEffect(() => {
    getListTournoi()
  }, [])

  useEffect(() => {
    if (type === 'Supprimer') {
      Swal.fire({
        title: 'Etes vous sur ?',
        text: 'Vous ne pourrez pas revenir en arrière !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui, supprime-le !',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put('http://127.0.0.1:3698/matchs', {
              id_user: user._id,
              id: selected._id,
              supprime: dayjs(),
            })
            .then(() => {
              getListTournoi()
              Swal.fire('Supprimé !', 'Votre donnée a été supprimé.', 'success')
            })
        }
      })
      setType('')
    } else if (type === 'Modifier') {
      console.log(matchs.find(({ _id }) => _id == selected._id))
      navigate('/match', {
        state: {
          type: 'Modifier',
          match: matchs.find(({ _id }) => _id == selected._id),
        },
      })
    }
  }, [type])
  return (
    <div>
      <FilteringTable
        title={'Liste des Matchs'}
        onUpdate={
          ['SUPER_ADMIN', 'ORGANISATEUR', 'STAFF'].includes(user.role) &&
          setSelected
        }
        onDelete={
          ['SUPER_ADMIN', 'ORGANISATEUR', 'STAFF'].includes(user.role) &&
          setSelected
        }
        setType={setType}
        columns={[
          {
            Header: 'Id',
            Footer: 'Id',
            accessor: '_id',
            Filter: ColumnFilter,
          },
          {
            Header: 'Date',
            accessor: 'date',
            type: 'date',
            Filter: ColumnFilter,
            clickable: true,
            cible: '/actions_match',
          },
          {
            Header: 'liste des Equipes',
            accessor: 'listeEquipes',
            Filter: ColumnFilter,
            type: 'array',
            field: 'nom',
          },
        ]}
        data={matchs}
      />
    </div>
  )
}

export default ListeMatchs
