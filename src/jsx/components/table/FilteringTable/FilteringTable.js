import React, { useMemo } from 'react'
import PageTitle from '../../../layouts/PageTitle'
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table'
import MOCK_DATA from './MOCK_DATA_2.json'
import { COLUMNS } from './Columns'
import { GlobalFilter } from './GlobalFilter'

import './filtering.css'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const FilteringTable = ({
  title,
  columns,
  data,
  onUpdate,
  onDelete,
  onBlock,
  setType,
}) => {
  const navigate = useNavigate()
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance

  const { globalFilter, pageIndex } = state
  const user = useSelector((state) => state.user)
  return (
    <>
      <PageTitle activeMenu={title} motherMenu="Table" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{title}</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} className="table dataTable display">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      return (
                        <th
                          style={{
                            display:
                              column.id === '_id' || column.type === 'array'
                                ? 'none'
                                : '',
                          }}
                          {...column.getHeaderProps()}
                        >
                          {column.render('Header')}
                          {column.canFilter ? column.render('Filter') : null}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="">
                {page.map((row) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            onClick={() => {
                              if (cell.column.clickable) {
                                console.log(cell.column._id)
                                navigate(cell.column.cible, {
                                  state: { object: row.original },
                                })
                              }
                            }}
                            style={{
                              cursor: cell.column.clickable
                                ? 'pointer'
                                : 'auto',
                              display: cell.column.id === '_id' ? 'none' : '',
                            }}
                            {...cell.getCellProps()}
                          >
                            {cell.column.type === 'role' ? (
                              <>
                                <img
                                  height={'35px'}
                                  width={'35px'}
                                  style={{ marginRight: '10px' }}
                                  src={'./' + row.original.role + '.png'}
                                />
                                {row.original.role}
                              </>
                            ) : cell.column.type === 'action' ? (
                              dayjs(row.original.match.date).format(
                                'DD-MM-YYYY'
                              ) +
                              ' les équipes : ' +
                              row.original.match.listeEquipes.map((v) => {
                                return v.nom + '  '
                              })
                            ) : cell.column.type === 'date' ? (
                              dayjs(
                                cell.render('Cell').props.cell.value
                              ).format('DD-MM-YYYY')
                            ) : cell.column.type === 'array' ? (
                              cell.render('Cell').props.cell.value.map((v) => {
                                return v[cell.column.field] + ' , '
                              })
                            ) : cell.column.type === 'object' ? (
                              dayjs(
                                cell.render('Cell').props.cell.value[
                                  cell.column.field
                                ]
                              ).format('DD-MM-YYYY')
                            ) : (
                              cell.render('Cell')
                            )}
                          </td>
                        )
                      })}
                      <td>
                        {onUpdate && (
                          <Button
                            onClick={() => {
                              onUpdate(row.original)
                              setType('Modifier')
                            }}
                            color="warning"
                            variant="contained"
                            style={{ marginRight: '10px' }}
                          >
                            Modifier
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            onClick={() => {
                              onDelete(row.original)
                              setType('Supprimer')
                            }}
                            color="error"
                            variant="contained"
                          >
                            Supprimer
                          </Button>
                        )}

                        {user.role === 'SUPER_ADMIN' && onBlock && (
                          <Button
                            onClick={() => {
                              onUpdate(row.original)
                              setType('Bloquer')
                            }}
                            color="error"
                            variant="contained"
                          >
                            Bloquer
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {''}
              </span>
              <span className="table-index">
                Go to page :{' '}
                <input
                  type="number"
                  className="ml-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0
                    gotoPage(pageNumber)
                  }}
                />
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {'<<'}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {'>>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FilteringTable
