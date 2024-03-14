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
    TableContainer, Button,
  } from '@chakra-ui/react'
  import axios from 'axios'
import { baseUrl } from '../apis'
import { formatDate } from '../utills/date'
const PendingList = () => {
    const [applications, setApplications] = useState([]);
    const handleApproved = async(application)=>{
        if (window.confirm("Are you sure you want to Approved this User?")) {
            const res = await axios.patch(`${baseUrl}application/update/${application._id}`);
            if (res.status===200) {
                getAllPendingReq();
            }
            console.log("Confirmed");
        }
    }

    const getAllPendingReq = async()=>{
        try {
            const res = await axios.get(`${baseUrl}application/get?status=pending`)
            if(res.status === 200){
                setApplications(res.data);
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getAllPendingReq();
    }, [])
    
    return (
        <div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Applicant Name</Th>
                        <Th>Loan</Th>
                        <Th isNumeric>Amount</Th>
                        <Th isNumeric>Date</Th>
                        <Th isNumeric>Action</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            applications?.map((application)=>(
                                <Tr>
                                    <Td>{application?.user?.name}</Td>
                                    <Td>{application?.loan?.title}</Td>
                                    <Td isNumeric>{application?.loan?.amount}</Td>
                                    <Td isNumeric>{formatDate(application.applicationDate)}</Td>
                                    <Td isNumeric>
                                        <Button onClick={()=>{handleApproved(application)}} colorScheme='blue' >Approve</Button>
                                    </Td>
                                </Tr>                    
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PendingList