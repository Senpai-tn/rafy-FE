import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilteringTable from '../../components/table/FilteringTable/FilteringTable'
import { ColumnFilter } from '../../components/table/FilteringTable/ColumnFilter'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

const ListAction = () => {
  const [tournois, setTournois] = useState([])
  const [selected, setSelected] = useState(null)
  const [type, setType] = useState('')
  const navigate = useNavigate()

  const getListTournoi = () => {
    axios
      .get('http://127.0.0.1:3698/actions', {
        params: { filter: { supprime: null } },
      })
      .then((response) => {
        setTournois(response.data)
      })
  }

  useEffect(() => {
    getListTournoi()
  }, [])

  useEffect(() => {
    if (type === 'Supprimer') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put('http://127.0.0.1:3698/actions', {
              id: selected._id,
              supprime: dayjs(),
            })
            .then((response) => {
              getListTournoi()
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            })
        }
      })
      setType('')
    }
  }, [type])
  return (
    <div>
      <FilteringTable
        title={'Liste des Actions'}
        onDelete={setSelected}
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
            Header: 'Date du match',
            accessor: 'match',
            type: 'action',
            Filter: ColumnFilter,
          },
          {
            Header: 'Type',
            accessor: 'type',
            type: 'text',
            Filter: ColumnFilter,
          },
          {
            Header: 'Temps',
            accessor: 'temps',
            type: 'text',
            Filter: ColumnFilter,
          },
        ]}
        data={tournois}
      />
    </div>
  )
}

export default ListAction
