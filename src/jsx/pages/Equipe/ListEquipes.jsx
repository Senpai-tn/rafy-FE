import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColumnFilter } from '../../components/table/FilteringTable/ColumnFilter'
import axios from 'axios'
import Swal from 'sweetalert2'
import FilteringTable from '../../components/table/FilteringTable/FilteringTable'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

const ListEquipes = () => {
  const [equipes, setEquipes] = useState([])
  const [selected, setSelected] = useState(null)
  const [type, setType] = useState('')
  const { user } = useSelector((state) => state)
  const navigate = useNavigate()
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
    getListEquipes()
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
            .put('http://127.0.0.1:3698/equipes', {
              id_user: user._id,
              id: selected._id,
              supprime: dayjs(),
            })
            .then(() => {
              getListEquipes()
              Swal.fire('Supprimé !', 'Votre donnée a été supprimé.', 'success')
            })
        }
      })
      setType('')
    } else if (type === 'Modifier') {
      console.log(selected)
      navigate('/equipe', { state: { type: 'Modifier', equipe: selected } })
    }
  }, [type])
  return (
    <div>
      <FilteringTable
        title={'Liste des Equipes'}
        onUpdate={
          ['SUPER_ADMIN', 'STAFF', 'ORGANISATEUR'].includes(user.role) &&
          setSelected
        }
        onDelete={
          ['SUPER_ADMIN', 'STAFF', 'ORGANISATEUR'].includes(user.role) &&
          setSelected
        }
        setType={setType}
        columns={[
          {
            Header: 'Id',
            Footer: 'Id',
            accessor: '_id',
            type: 'text',
            Filter: ColumnFilter,
          },
          {
            Header: 'Nom',
            accessor: 'nom',
            type: 'text',
            Filter: ColumnFilter,
          },
          {
            Header: 'Liste Des Joueurs',
            accessor: 'listeJoueurs',
            type: 'array',
            field: 'username',
            Filter: ColumnFilter,
          },
        ]}
        data={equipes}
      />
    </div>
  )
}

export default ListEquipes
