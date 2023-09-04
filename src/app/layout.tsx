import SignIn from '@/components/SignIn'
import NavBar from '@/components/NavBar'

const Layout = ({ children }) => {
  return (
    <div className="div">
      <NavBar />
      <main style={{ textAlign: 'center' }}>{children}</main>
    </div>
  )
}

export default Layout
