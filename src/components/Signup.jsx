import React, {useState} from 'react';
import authService from '../appwrite/auth';
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import {useForm} from 'react-hook-form';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, seterror] = useState('')
    const {register, handleSubmit} = useForm();

    const signUp = async (data) => {
        seterror('');
        try {
            const userData = await authService.createAccount(data);
            if(userData){
                const nUserData = await authService.getCurrentUser();
                nUserData ? dispatch(login(nUserData)) : null;
                navigate('/')
            }
        } catch (error) {
            seterror(error)
        }
    }

  return (
    <div>Signup</div>
  )
}

export default Signup