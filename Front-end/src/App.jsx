
import './App.css'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/LoginPage'
import PostManagementPage from './pages/PostManagementPage'
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const navigateToDashboard = () => setCurrentPage('dashboard')
  const navigateToEditPost = () => setCurrentPage('editpost')

  return (
    <>
      
      <Login/>
      <PostManagementPage/>
    </>
  )
}

export default App
