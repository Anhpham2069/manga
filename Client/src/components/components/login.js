import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faGoogle } from '@fortawesome/free-brands-svg-icons'

const Login = () => {
  return (
    <div className='text-base'>
        <span className='font-medium'>Tài khoản</span>
        <input placeholder='Email' className='mb-4 border-[1px] border-bd-color outline-none w-full p-2 rounded-md'></input>
        <span className='font-medium'>Mật khẩu</span>
        <input placeholder='Mật khẩu' className='border-[1px] border-bd-color outline-none w-full p-2 rounded-md'></input>
        <p className='text-end'>Quên mật khẩu ?</p>
        <button className='bg-[#ff3860] text-white  rounded-md w-full p-2 my-3'>Đăng nhập</button>
        <p className='text-center '>Không có tài khoản ?  <span className='cursor-pointer font-medium'>Đăng kí ngay !</span></p>
        <div className='w-full flex flex-col items-center'>
            <button className='p-2 my-3  font-medium text-[#535a60] hover:text-red-500   border-[1px] border-bd-color w-[70%] rounded-full'><FontAwesomeIcon icon={faGoogle} /> Đăng nhập bằng Google</button>
            <button className='p-2  bg-[#395697] hover:bg-[#536b9e] text-white border-[1px] border-bd-color w-[70%] rounded-full'><FontAwesomeIcon icon={faFacebook} /> Đăng nhập bằng Facebook</button>
        </div>
        
    </div>
  )
}

export default Login