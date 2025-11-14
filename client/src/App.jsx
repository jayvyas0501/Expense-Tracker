import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { Button } from '@/components/ui/button'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
return (
<BrowserRouter>
<div className="min-h-screen bg-gray-50">
<header className="p-4">
<Button>Example</Button>
</header>


<main className="p-4">
<Routes>
<Route index element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
</Routes>
</main>
</div>
</BrowserRouter>
)
}


export default App