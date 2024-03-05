import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api', formData);
      console.log(response.data); // Check the response from the backend
      // You can perform additional actions after successful registration here
    } catch (error) {
      console.error('Error during registration:', error.response.data.message);
      // Handle errors and display error messages if needed
    }
  };

  return (
    <div className='text-base'>
      <span className='font-medium'>Tên</span>
      <input
        type='text'
        name='username'
        placeholder='Tên'
        className='mb-3 border-[1px] border-bd-color outline-none w-full p-2 rounded-md'
        onChange={handleChange}
      />

      <span className='font-medium'>Tài khoản</span>
      <input
        type='email'
        name='email'
        placeholder='Email'
        className='mb-3 border-[1px] border-bd-color outline-none w-full p-2 rounded-md'
        onChange={handleChange}
      />

      <span className='font-medium'>Mật khẩu</span>
      <input
        type='password'
        name='password'
        placeholder='Mật khẩu'
        className='border-[1px] border-bd-color outline-none w-full p-2 rounded-md'
        onChange={handleChange}
      />

      <span className='font-medium'>Xác nhận mật khẩu</span>
      <input
        type='password'
        name='confirmPassword'
        placeholder='Xác nhận mật khẩu'
        className='my-3 border-[1px] border-bd-color outline-none w-full p-2 rounded-md'
        onChange={handleChange}
      />

      <button onClick={handleRegister} className='bg-[#ff3860] text-white rounded-md w-full p-2 my-3'>
        Đăng ký
      </button>

      <p className='text-center '>
        Bạn đã có tài khoản ?{' '}
        <span className='cursor-pointer font-medium'>Đăng nhập ngay !</span>
      </p>

      <div className='w-full flex flex-col items-center'>
        <button className='p-2 my-3  font-medium text-[#535a60] hover:text-red-500   border-[1px] border-bd-color w-[70%] rounded-full'>
          <FontAwesomeIcon icon={faGoogle} /> Đăng ký bằng Google
        </button>

        <button className='p-2  bg-[#395697] hover:bg-[#536b9e] text-white border-[1px] border-bd-color w-[70%] rounded-full'>
          <FontAwesomeIcon icon={faFacebook} /> Đăng ký bằng Facebook
        </button>
      </div>
    </div>
  );
};

export default Register;
