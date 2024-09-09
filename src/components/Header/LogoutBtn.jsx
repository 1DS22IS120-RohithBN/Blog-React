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
    className='bg-red-700 px-6 py-2 hover:bg-red-900 rounded-full duration-200'>
        Logout</button>
  )
}

export default LogoutBtn
