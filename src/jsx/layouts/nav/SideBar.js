/// Menu
import Metismenu from 'metismenujs'
import React, { Component, useContext, useEffect } from 'react'
/// Scroll
import PerfectScrollbar from 'react-perfect-scrollbar'
/// Link
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { ThemeContext } from '../../../context/ThemeContext'
import LogoutPage from './Logout'

/// Image
//import user from "../../../images/user.jpg";
import profile from '../../../images/user.jpg'
import { useSelector } from 'react-redux'

class MM extends Component {
  componentDidMount() {
    this.$el = this.el
    this.mm = new Metismenu(this.$el)
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    )
  }
}

const SideBar = () => {
  const user = useSelector((state) => state.user)
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext)
  useEffect(() => {
    var btn = document.querySelector('.nav-control')
    var aaa = document.querySelector('#main-wrapper')
    function toggleFunc() {
      return aaa.classList.toggle('menu-toggle')
    }
    btn.addEventListener('click', toggleFunc)

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector('.heart')
    function heartBlast() {
      return handleheartBlast.classList.toggle('heart-blast')
    }
    handleheartBlast.addEventListener('click', heartBlast)
  }, [])
  /// Path
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]
  /// Active menu
  let deshBoard = [
      '',
      'dashboard-dark',
      'wallet',
      'invoices-list',
      'create-invoices',
      'card-center',
      'transaction-details',
      'task',
      'AddTournoi',
    ],
    app = [
      'app-profile',
      'post-details',
      'app-calender',
      'email-compose',
      'email-inbox',
      'email-read',
      'ecom-product-grid',
      'ecom-product-list',
      'ecom-product-order',
      'ecom-checkout',
      'ecom-invoice',
      'ecom-customers',
      'post-details',
      'ecom-product-detail',
    ],
    charts = [
      'chart-rechart',
      'chart-flot',
      'chart-chartjs',
      'chart-chartist',
      'chart-sparkline',
      'chart-apexchart',
    ],
    plugins = [
      'uc-select2',
      'uc-sweetalert',
      'uc-toastr',
      'uc-noui-slider',
      'map-jqvmap',
      'uc-lightgallery',
    ],
    redux = ['redux-form', 'redux-wizard', 'todo'],
    widget = ['widget-basic']

  return (
    <div className={`dlabnav ${iconHover} `}>
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown className="dropdown header-profile2">
          <Dropdown.Toggle
            variant=""
            as="a"
            className="nav-link i-false c-pointer"
          >
            <div className="header-info2 d-flex align-items-center border">
              <img src={profile} width={20} alt="" />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w700 d-block mb-2">{user.email}</span>
                  <small className="text-end font-w400">{user.role}</small>
                </div>
                <i className="fas fa-sort-down ms-4"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="right"
            className=" dropdown-menu dropdown-menu-end"
          >
            {/* <Link to="/app-profile" className="dropdown-item ai-icon">
              <svg
                id="icon-user1"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary me-1"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile </span>
            </Link>
            <Link to="/email-inbox" className="dropdown-item ai-icon">
              <svg
                id="icon-inbox"
                xmlns="http://www.w3.org/2000/svg"
                className="text-success me-1"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="ms-2">Inbox</span>
            </Link> */}
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          {/* dashboard */}
          <li className={`${deshBoard.includes(path) ? 'mm-active' : ''}`}>
            <Link className="has-arrow" to="#">
              <img
                src={'./dashboard.png'}
                height={'21px'}
                width={'21px'}
                style={{ marginRight: '21px' }}
              />
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === 'dashboard' ? 'mm-active' : ''}`}
                  to="/dashboard"
                >
                  Dashboard Light
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === 'dashboard-dark' ? 'mm-active' : ''}`}
                  to="/dashboard-dark"
                >
                  Dashboard Dark
                </Link>
              </li>
            </ul>
          </li>
          {/* users */}
          {['SUPER_ADMIN'].includes(user.role) && (
            <li className={`${app.includes(path) ? 'mm-active' : ''}`}>
              <Link className="has-arrow ai-icon" to="#">
                <img
                  src={'./users.png'}
                  height={'21px'}
                  width={'21px'}
                  style={{ marginRight: '21px' }}
                />
                <span className="nav-text">Utilisateurs</span>
              </Link>
              <ul>
                <li>
                  <Link
                    className={`${path === 'task' ? 'mm-active' : ''}`}
                    to="/user"
                  >
                    Ajouter organisateur
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === 'task' ? 'mm-active' : ''}`}
                    to="/users"
                  >
                    Liste des utilisateurs
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {/* tournois */}
          <li className={`${charts.includes(path) ? 'mm-active' : ''}`}>
            <Link className="has-arrow ai-icon" to="#">
              <img
                src={'./tournois.png'}
                height={'21px'}
                width={'21px'}
                style={{ marginRight: '21px' }}
              />
              <span className="nav-text">Tournois</span>
            </Link>
            <ul>
              {['SUPER_ADMIN', 'ORGANISATEUR'].includes(user.role) && (
                <li>
                  <Link
                    className={`${path === 'task' ? 'mm-active' : ''}`}
                    to="/tournoi"
                  >
                    Ajouter Tournoi
                  </Link>
                </li>
              )}
              {
                <li>
                  <Link
                    className={`${path === 'task' ? 'mm-active' : ''}`}
                    to="/tournois"
                  >
                    Liste des Tournois
                  </Link>
                </li>
              }
            </ul>
          </li>
          {/* equipes */}
          {
            <li className={`${plugins.includes(path) ? 'mm-active' : ''}`}>
              <Link className="has-arrow ai-icon" to="#">
                <img
                  src={'./equipes.png'}
                  height={'21px'}
                  width={'21px'}
                  style={{ marginRight: '21px' }}
                />
                <span className="nav-text">Equipes</span>
              </Link>
              <ul>
                {
                  <li>
                    <Link
                      className={`${path === 'task' ? 'mm-active' : ''}`}
                      to="/equipes"
                    >
                      Liste des Equipes
                    </Link>
                  </li>
                }
                {['SUPER_ADMIN', 'ORGANISATEUR', 'STAFF'].includes(
                  user.role
                ) && (
                  <li>
                    <Link
                      className={`${path === 'task' ? 'mm-active' : ''}`}
                      to="/equipe"
                    >
                      Ajouter une Equipe
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          }
          {/* matchs */}
          {
            <li className={`${redux.includes(path) ? 'mm-active' : ''}`}>
              <Link className="has-arrow ai-icon" to="#">
                <img
                  src={'./matchs.png'}
                  height={'21px'}
                  width={'21px'}
                  style={{ marginRight: '21px' }}
                />
                <span className="nav-text">Match</span>
              </Link>
              <ul>
                {['SUPER_ADMIN', 'ORGANISATEUR', 'STAFF'].includes(
                  user.role
                ) && (
                  <li>
                    <Link
                      className={`${path === 'task' ? 'mm-active' : ''}`}
                      to="/match"
                    >
                      Ajouter un Match
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className={`${path === 'task' ? 'mm-active' : ''}`}
                    to="/matchs"
                  >
                    Liste des Match
                  </Link>
                </li>
              </ul>
            </li>
          }
          {/* actions */}
          {
            <li className={`${widget.includes(path) ? 'mm-active' : ''}`}>
              <Link to="widget-basic" className="has-arrow ai-icon">
                <img
                  src={'./actions.png'}
                  height={'21px'}
                  width={'21px'}
                  style={{ marginRight: '21px' }}
                />
                <span className="nav-text">Actions</span>
              </Link>
              <ul>
                {
                  <li>
                    <Link
                      className={`${path === 'task' ? 'mm-active' : ''}`}
                      to="/actions"
                    >
                      Liste Des Actions
                    </Link>
                  </li>
                }
                {['SUPER_ADMIN', 'ARBITRE'].includes(user.role) && (
                  <li>
                    <Link
                      className={`${path === 'task' ? 'mm-active' : ''}`}
                      to="/action"
                    >
                      Ajouter une Action
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          }
        </MM>
        <div className="copyright">
          <p>
            <strong>Invome Admin Dashboard</strong> © 2022 All Rights Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by DexignLabs
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default SideBar
