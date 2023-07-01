import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import FilteringTable from '../../components/table/FilteringTable/FilteringTable'
import { ColumnFilter } from '../../components/table/FilteringTable/ColumnFilter'
import dayjs from 'dayjs'

const ListUsers = () => {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const getListUsers = () => {
    axios
      .get('http://127.0.0.1:3698/users', {
        params: { filter: { supprime: null } },
      })
      .then((response) => {
        setUsers(response.data)
      })
  }

  useEffect(() => {
    getListUsers()
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
            .put('http://127.0.0.1:3698/users', {
              id: selected._id,
              supprime: dayjs(),
            })
            .then((response) => {
              getListUsers()
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
        title={'Liste des Tournois'}
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
            Header: 'Username',
            accessor: 'username',
            type: 'text',
            Filter: ColumnFilter,
          },
          {
            Header: 'Email',
            accessor: 'email',
            type: 'text',
            Filter: ColumnFilter,
          },

          {
            Header: 'Rôle',
            accessor: 'role',
            type: 'text',
            Filter: ColumnFilter,
          },
        ]}
        data={users}
      />
    </div>
  )
}

export default ListUsers
