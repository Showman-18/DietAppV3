import { Outlet, Link } from 'react-router-dom'

export default function PatientLayout() {
  return (
    <div className="space-y-4 p-6">
      <nav className="flex gap-3 text-sm">
        <Link to="/patient/diet">Diet</Link>
        <Link to="/patient/progress">Progress</Link>
        <Link to="/patient/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  )
}
