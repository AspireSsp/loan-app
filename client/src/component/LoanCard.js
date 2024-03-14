import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, Text, Heading, Stack, Image } from '@chakra-ui/react'
import EditLoan from './EditLoan'
import axios from 'axios'
import { baseUrl } from '../apis'
const LoanCard = ({loan, getAllLoans}) => {

    const handleDelete = async()=>{
        if (window.confirm("Are you sure you want to Delete?")) {
            const res = await axios.delete(`${baseUrl}loan/delete/${loan._id}`);
            if (res.status===200) {
                getAllLoans();
            }
            console.log("Confirmed");
        }
    }
  return (
    <div>
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            m={1}
            >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://img.freepik.com/premium-photo/businessman-accountant-financial-expert-analyze-business-report-graph-finance-chart-corporate-office-concept-finance-economy-banking-business-stock-market-research_31965-15359.jpg'
                alt='loan images'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{loan.title}</Heading>
                    <Text py='2'>
                        {loan.description}
                    </Text>

                </CardBody>

                <CardFooter>
                    <EditLoan loan={loan} getAllLoans={getAllLoans}/>
                    <Button onClick={handleDelete} m={2} variant='solid' colorScheme='red'>
                        Delete
                    </Button>
                </CardFooter>
            </Stack>
            </Card>
    </div>
  )
}

export default LoanCard