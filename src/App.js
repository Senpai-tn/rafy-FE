import { lazy, Suspense, useEffect } from 'react'

/// Components
import Index from './jsx'
import { connect, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
// Style
import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css'
import './css/style.css'
import Login from './jsx/pages/Login'
import { signUp } from './services/AuthService'
import ForgotPassword from './jsx/pages/ForgotPassword'
import Register from './jsx/pages/Registration'
import Markup from './jsx'
import Error404 from './jsx/pages/Error404'
import FilteringTable from './jsx/components/table/FilteringTable/FilteringTable'

function App() {
  const user = useSelector((state) => state.user)

  return (
    <>
      {user ? (
        <Markup />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" component={<ForgotPassword />} />
        </Routes>
      )}
    </>
  )
}

export default App
