import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import axios from 'axios';
import { baseUrl } from '../../apis';
const UserLoanLists = () => {
    const [myLoanList, setMyLoanList] = useState([]);
    const getMyloans = async()=>{
        try {
            const token = JSON.parse(sessionStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'));
            const res = await axios.get(baseUrl + "application/my-application", {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
            });
            if(res.status===200){
                setMyLoanList(res.data)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
      getMyloans();
    }, [])
    
    return (
        <div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Loan</Th>
                            <Th>Amount</Th>
                            <Th isNumeric>InterestRate</Th>
                            <Th isNumeric>Duration</Th>
                            <Th >status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            myLoanList.map((myloan)=>(
                                <Tr>
                                    <Td>{myloan.loan.title}</Td>
                                    <Td>{myloan.loan.amount}</Td>
                                    <Td isNumeric>{myloan.loan.interestRate}</Td>
                                    <Td isNumeric>{myloan.loan.repaymentPeriod}</Td>
                                    <Td isNumeric color={myloan.status=='approved' ? "green" : "red"}>{myloan.status}</Td>
                                </Tr>
                            ))
                        }
                      
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserLoanLists