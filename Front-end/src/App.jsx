
import './App.css'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/LoginPage'
import PostManagementPage from './pages/PostManagementPage'
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const navigateToDashboard = () => setCurrentPage('dashboard')
  const navigateToPostManagement = () => setCurrentPage('postmanagement')
  const navigateToEditPost = () => setCurrentPage('editpost')

  return (
    <>
      <Login />
      <Dashboard onCreatePost={navigateToEditPost} />
      <PostManagementPage />
    </>
  )
}

export default App
