import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = (message) => {
    return (
    <ToastContainer
    position='top-right'
    autoClose={false}
    hideProgressBar={false}
    newestOnTop={true}
    pauseOnHover>{message}</ToastContainer>
    )
}

export default Toast;