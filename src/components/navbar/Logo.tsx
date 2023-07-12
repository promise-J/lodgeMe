import { Link } from "react-router-dom"

const Logo = () => {
    // const router = useRouter()

  return (
    <Link to={'/'}>
    <img src='/images/logo.png' className='hidden md:block cursor-pointer' alt='Logo' height='0' width='70' />
    </Link>
  )
}

export default Logo