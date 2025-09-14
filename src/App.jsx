import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import MainLayout from './components/layout/MainLayout.jsx'
import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import PatientLayout from './pages/patient/Layout.jsx'
import Diet from './pages/patient/Diet.jsx'
import Progress from './pages/patient/Progress.jsx'
import Profile from './pages/patient/Profile.jsx'
import DoctorLayout from './pages/doctor/Layout.jsx'
import Patients from './pages/doctor/Patients.jsx'
import Generate from './pages/doctor/Generate.jsx'
import Records from './pages/doctor/Records.jsx'
import NotFound from './pages/NotFound.jsx'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/patient" element={<PatientLayout />}>
              <Route path="diet" element={<Diet />} />
              <Route path="progress" element={<Progress />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route path="patients" element={<Patients />} />
              <Route path="generate" element={<Generate />} />
              <Route path="records" element={<Records />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
