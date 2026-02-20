import React from 'react'
import AnnonceList from './pages/AnnonceList'
import AnnonceForm from './pages/AnnonceForm'
import AnnonceEdit from './pages/AnnonceEdit'
import Login from './pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AnnonceEnAttente from './pages/AnnonceEnAttente'
import AnnonceApprouvee from './pages/AnnonceApprouvee'
import Contact from './pages/Contact'
import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AnnonceList />} />
        <Route path='/create' element={<AnnonceForm />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path="/raktak" element={<ProtectedRoute><AnnonceEnAttente /></ProtectedRoute>}/>
        <Route path='/raktakApproved' element={<ProtectedRoute><AnnonceApprouvee /></ProtectedRoute>} />
        <Route path='/raktak/edit/:id' element={<ProtectedRoute><AnnonceEdit /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App