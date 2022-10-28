import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const {loading, error, dispatch} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({username: '',password: '',})
    const handlChange =  (e) => {setCredentials((prev) =>({...prev, [e.target.id]: e.target.value }))}
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try{
          const res = await axios.post("http://localhost:8000/api/auth/login", credentials)
          dispatch({type: "LOGIN_SUCCESS", payload: res.data.details});
          navigate('/')
          console.log(res.data)
        }
        catch(err){
          dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }   
    }

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="lInput"
          onChange={handlChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="lInput"
          onChange={handlChange}
        />
        <button disabled={loading} onClick={handleSubmit}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login