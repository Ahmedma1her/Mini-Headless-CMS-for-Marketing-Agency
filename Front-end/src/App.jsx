
import './App.css'
<<<<<<< HEAD
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
=======
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Dashboard />
>>>>>>> b2eefc5562284c21fe5910332291cc17fa9b11c3
    </>
  )
}

export default App
