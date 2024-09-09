import{useDispatch} from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'
import  authservice  from './appwrite/auth'
import { login,logout } from './store/authSlice'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
 const [loading,setLoading]=useState(true)
 const dispatch=useDispatch()

useEffect(()=>{
authservice.getCurrentUser()
  .then((UserData)=>{
    if(UserData){
      dispatch(login(UserData))}
      else{
        dispatch(logout())
      }})
    .finally(()=>{
        setLoading(false)
      })
  },[])



return (!loading)?(
  <div className='min-h-screen flex flex-wrap content-between bg-slate-500'>
    <div className='w-full block'>
    <Header />
    POSTS:<Outlet/>
    <Footer/>
    </div>
  </div>
) : null
}

export default App
