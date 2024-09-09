import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


function LogoutBtn() {
    const dispatch=useDispatch();
    const handleLogout = () => {
        authservice.logout().then(() => {
            dispatch(logout())})}
    
  return (
    <button 
    onClick={handleLogout}
    className='bg-[#6A9C89] px-6 py-2 hover:bg-[#4e6f64] rounded-full duration-200 shadow-lg shadow-[#1c3129] text-black mr-4'>
        Logout</button>
  )
}

export default LogoutBtn
