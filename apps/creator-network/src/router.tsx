import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard/dashboard'
import VersionPage from './pages/version'
import AssetsPage from './pages/assets/assets'
import Layout from './App'


export default function Root() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/version" element={<VersionPage />} />
      </Route>
    </Routes>
  )
}