import { Outlet, Link } from 'react-router-dom'

export default function DoctorLayout() {
  return (
    <div className="space-y-4 p-6">
      <nav className="flex gap-3 text-sm">
        <Link to="/doctor/patients">Patients</Link>
        <Link to="/doctor/generate">Generate</Link>
        <Link to="/doctor/records">Records</Link>
      </nav>
      <Outlet />
    </div>
  )
}
