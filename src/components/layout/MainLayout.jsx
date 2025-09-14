import { Link, Outlet, useLocation } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-200 text-green-800 shadow-inner">
        <span className="text-sm font-bold">A</span>
      </span>
      <span className="font-semibold text-lg text-green-800">AyurManage</span>
    </Link>
  )
}

function Header() {
  const location = useLocation()
  const onLanding = location.pathname === '/'
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {onLanding && (
            <>
              <a href="#features" className="text-gray-500 hover:text-green-800">Features</a>
              <a href="#about" className="text-gray-500 hover:text-green-800">About</a>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:block text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] font-medium">Login</Link>
          <Link to="/signup" className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white rounded-full px-5 py-2 shadow">Get Started</Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="container mx-auto py-10 grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-gray-600 max-w-sm">Comprehensive cloud-based practice management and nutrient analysis software for Ayurvedic dietitians.</p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-gray-700 mb-2">Product</div>
          <ul className="space-y-1">
            <li><a className="hover:text-green-800" href="#features">Features</a></li>
            <li><a className="hover:text-green-800" href="#about">About</a></li>
          </ul>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-gray-700 mb-2">Legal</div>
          <ul className="space-y-1">
            <li><a className="hover:text-green-800" href="#">Privacy</a></li>
            <li><a className="hover:text-green-800" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500 bg-gray-50">© {new Date().getFullYear()} AyurManage. All rights reserved.</div>
    </footer>
  )
}

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
