import React, { useContext } from 'react'

/// React router dom
import { Routes, Route } from 'react-router-dom'

/// Css
import './index.css'
import './chart.css'
import './step.css'

/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'
import ScrollToTop from './layouts/ScrollToTop'
/// Dashboard
import Home from './components/Dashboard/Home'
import DashboardDark from './components/Dashboard/DashboardDark'

import Error403 from './pages/Error403'
import Error404 from './pages/Error404'

import { ThemeContext } from '../context/ThemeContext'
import { useSelector } from 'react-redux'
import { ListTournois, Tournoi } from './pages/TournoiFolder'
import { ListeMatchPerTournoi, ListeMatchs, Match } from './pages/Match/'
import { ListEquipes, Equipe } from './pages/Equipe'
import { Action, ListAction, ListActionPerMatch } from './pages/Action'
import { ListUsers } from './pages/Users'
import User from './pages/Users/User'

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext)
  const routes = [
    /// Dashboard
    {
      url: '',
      component: Home,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'dashboard',
      component: Home,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'dashboard-dark',
      component: DashboardDark,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },

    {
      url: 'tournoi',
      component: Tournoi,
      roles: ['SUPER_ADMIN', 'ORGANISATEUR'],
    },
    {
      url: 'tournois',
      component: ListTournois,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'matchs_tournoi',
      component: ListeMatchPerTournoi,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'matchs',
      component: ListeMatchs,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'match',
      component: Match,
      roles: ['SUPER_ADMIN', 'ORGANISATEUR', 'STAFF'],
    },
    {
      url: 'equipes',
      component: ListEquipes,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'equipe',
      component: Equipe,
      roles: ['SUPER_ADMIN', 'STAFF', 'ORGANISATEUR'],
    },
    {
      url: 'actions',
      component: ListAction,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    {
      url: 'actions_match',
      component: ListActionPerMatch,
      roles: ['SUPER_ADMIN', 'JOUEUR', 'STAFF', 'ORGANISATEUR', 'ARBITRE'],
    },
    { url: 'action', component: Action, roles: ['SUPER_ADMIN', 'ARBITRE'] },
    {
      url: 'users',
      component: ListUsers,
      roles: ['SUPER_ADMIN'],
    },
    {
      url: 'user',
      component: User,
      roles: ['SUPER_ADMIN'],
    },
  ]
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]

  let pagePath = path.split('-').includes('page')
  const user = useSelector((state) => state.user)
  return (
    <>
      <div
        id={`${!pagePath ? 'main-wrapper' : ''}`}
        className={`${!pagePath ? 'show' : 'mh100vh'}  ${
          menuToggle ? 'menu-toggle' : ''
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? 'content-body' : ''}`}>
          <div
            className={`${'container-fluid'}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Routes>
              {routes.map((data, i) => {
                return data.roles && data.roles.includes(user.role) ? (
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    element={<data.component />}
                  />
                ) : (
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    element={<Error403 />}
                  />
                )
              })}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </>
  )
}

export default Markup
