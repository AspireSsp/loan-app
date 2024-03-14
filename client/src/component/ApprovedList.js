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
const ApprovedList = () => {
    const [applications, setApplications] = useState([]);

    const getAllPendingReq = async()=>{
        try {
            const res = await axios.get(`${baseUrl}application/get?status=approved`)
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
                        <Th isNumeric>status</Th>
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
                                    <Td color={'green'} isNumeric>
                                        {application.status}
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

export default ApprovedList