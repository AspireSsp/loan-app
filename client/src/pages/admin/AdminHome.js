import AddLoanModel from '../../component/AddLoanModel'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { baseUrl } from "../../apis";
import { useToast } from '@chakra-ui/react'
import { UserState } from '../../context/user';
import LoanCard from '../../component/LoanCard';

const AdminHome = () => {
  const { user, setUser } = UserState();
  const toast = useToast()
  const navigate = useNavigate()
  const [loans, setloans] = useState([]);
  console.log(loans);
  const getUSer = async()=>{
    const tkn = sessionStorage.getItem('token') || localStorage.getItem('token')
    const token = JSON.parse(tkn);
    console.log(token);
    if(!token){
      navigate('/login')
    }else{
      try {
        const res = await axios.get(baseUrl+'user/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
        console.log(res); 
        if(res.status===200){
          if(res.data.user.role === "user"){
            navigate('/');
          }
          setUser(res.data.user);
        } 
      } catch (error) {
        navigate('/login');
        toast({
          title: 'Error Occured',
          description: 'your token is expired please login again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const getAllLoans = async()=>{
    try {
      const res = await axios.get(baseUrl+'loan/get');
      if(res.status === 200){
        setloans(res.data)
      }
    } catch (error) {
      
    }
  }
  
  useEffect(() => {
    getUSer();
    const checkUser = ()=>{
      if(user?.role === "user"){
        navigate('/')
      }
    }
    checkUser();
    getAllLoans();
  }, [])
  return (
    <div className='m-4'>
      <div className='flex justify-end'>
        <AddLoanModel />
      </div>
      <div className='my-4' >
        {
          loans?.map((loan)=>(
            <LoanCard loan={loan} getAllLoans={getAllLoans} />
          ))
        }
      </div>
        
    </div>
  )
}

export default AdminHome