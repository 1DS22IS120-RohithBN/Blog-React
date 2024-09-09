import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './components/Pages/Home.jsx'
import LoginPage from './components/Pages/LoginPage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import SignupPage from './components/Pages/SignupPage.jsx'
import Allposts from './components/Pages/Allposts.jsx'
import Post from './components/Pages/Post.jsx'
import AddPost from './components/Pages/AddPost.jsx'
import EditPost from './components/Pages/EditPost.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <LoginPage />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignupPage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Allposts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)