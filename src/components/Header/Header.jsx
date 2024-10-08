import React, { useEffect } from 'react'
import authservice from '../../appwrite/auth'
import Container from '../container/Container'
import LogoutBtn from './LogoutBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo'


function Header() {
  const navigate = useNavigate()
  const authStatus=useSelector((state)=>state.auth.status)
  const navItems=[
    {
      name:'Home',
      slug:'/',
      active:true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return  (
    <header className='py-6  sticky h-24 py bg-[#16423C] shadow-sm shadow-[#27473b] rounded-sm'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='70px'/></Link>
          </div>
          <ul className='flex ml-auto text-white hover:text-black'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button  className='inline-block px-6 py-3 mr-2 duration-200 hover:bg-[#C4DAD2] rounded-full'
                  onClick={()=> navigate(item.slug)}>{item.name}</button>
                </li>

              ):null
            )}
            
              {authStatus && (
                 <li key='logout'>
                 <LogoutBtn/>
                 </li>
              )}
            
          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header
