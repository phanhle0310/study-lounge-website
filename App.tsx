import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Spaces from './pages/Spaces'
import BookingPage from './pages/Booking'
import Menu from './pages/Menu'
import Membership from './pages/Membership'
import About from './pages/About'
import Contact from './pages/Contact'
import { LinkButton } from './components/ui'
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="spaces" element={<Spaces />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="menu" element={<Menu />} />
        <Route path="membership" element={<Membership />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<div className="py-32 text-center"><h1 className="text-5xl">Page not found</h1><div className="mt-8"><LinkButton to="/">Back home</LinkButton></div></div>} />
      </Route>
    </Routes>
  )
}
