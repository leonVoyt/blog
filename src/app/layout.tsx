import SignIn from '@/components/SignIn'
import NavBar from '@/components/NavBar'
interface Props {
  children: string | JSX.Element | JSX.Element[]
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="div">
      <NavBar />
      <main style={{ textAlign: 'center' }}>{children}</main>
    </div>
  )
}

export default Layout
