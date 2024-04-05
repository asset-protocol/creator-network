import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/dashboard/dashboard'
import VersionPage from './pages/version'
import AssetsPage from './pages/assets/assets'
import AssetViewerPage from './pages/assets-viewer'
import AssetCreatePage from './pages/assets-create'
import AssetEditPage from './pages/assets-edit'
import Layout from './App'


export default function Root() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/assets/:assetId" element={<AssetViewerPage />} />
        <Route path="/assets/create" element={<AssetCreatePage />} />
        <Route path="/assets/:assetId/edit" element={<AssetEditPage />} />
        <Route path="/version" element={<VersionPage />} />
      </Route>
    </Routes>
  )
}