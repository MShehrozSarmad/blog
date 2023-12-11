import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('')
        try {
            const session = authService.loginAccount(data);
            if(session){
                const userData = authService.getCurrentUser();
                userData ? dispatch(login(userData)) : null;
                navigate('/')
            }
        } catch (error) {
            setError(error)
        }
    }

  return (
    <div>Login</div>
  )
}

export default Login