
import './App.css'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const navigateToDashboard = () => setCurrentPage('dashboard')
  const navigateToEditPost = () => setCurrentPage('editpost')

  return (
    <>
      {currentPage === 'dashboard' ? (
        <Dashboard onCreatePost={navigateToEditPost} />
      ) : (
        <EditPost onBack={navigateToDashboard} />
      )}
    </>
  )
}

export default App
