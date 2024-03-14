'use client'

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button, Wrap,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { baseUrl } from '../apis'
import axios from 'axios'


function PriceWrapper(props) {
  const { children } = props

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
    //   borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  )
}

export default function LoanCards() {

    const[loanList, setLoanList] = useState([]);

    const getLoanList = async()=>{
        try {
            const res = await axios.get(baseUrl+"loan/get");
            if(res.status === 200){
                setLoanList(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLoanList();
    }, [])

    function calculateInstallments(amount, interestRate) {
        const totalAmount = amount * (1 + interestRate / 100);
        const installmentAmount = totalAmount / 3;
        return installmentAmount;
    }

    const handleTakeLoan = async(loan)=>{
        try {
            if(window.confirm("Are you sure you want to Apply?")) {
                const body = {
                    loan: loan._id,
                    applicationDate: new Date(Date.now()),
                }
                const token = JSON.parse(sessionStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'));
                const res = await axios.post(baseUrl + "application/add",body, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                });
                if (res.status===201) {
                    window.alert("you applied for this loan successfully")
                }
            }
        } catch (error) {
            console.log(error);
            if(error.response.status===422){
                window.alert(error.response.data.message)
            }
        }
    }
    

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Loans that fit your need
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Get a Loan withIn a day. No credit card needed. Pay in 21 Days.
        </Text>
      </VStack>
      <Wrap
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
            {
                loanList.map((loan)=>(
                    <PriceWrapper>
                    <Box position="relative">
                        <Box
                        position="absolute"
                        top="-16px"
                        left="50%"
                        style={{ transform: 'translate(-50%)' }}>
                        <Text
                            textTransform="uppercase"
                            // bg={useColorModeValue('red.300', 'red.700')}
                            px={3}
                            py={1}
                            // color={useColorModeValue('gray.900', 'gray.300')}
                            fontSize="sm"
                            fontWeight="600"
                            rounded="xl">
                            Most Popular
                        </Text>
                        </Box>
                        <Box py={4} px={12}>
                        <Text fontWeight="500" fontSize="2xl">
                            {loan.title}
                        </Text>
                        <HStack justifyContent="center">
                            <Text fontSize="3xl" fontWeight="600">
                            ₹
                            </Text>
                            <Text fontSize="5xl" fontWeight="900">
                            {calculateInstallments(loan.amount, loan.interestRate)}
                            </Text>
                            <Text fontSize="3xl" color="gray.500">
                            /month
                            </Text>
                        </HStack>
                        </Box>
                        <VStack
                        // bg={useColorModeValue('gray.50', 'gray.700')}
                        py={4}
                        borderBottomRadius={'xl'}>
                        <List spacing={3} textAlign="start" px={12}>
                            <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Total Amount of the loan is ₹{loan.amount}
                            </ListItem>
                            <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Max time to return Loan is {loan.repaymentPeriod}days
                            </ListItem>
                            <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Interest rate is {loan.interestRate}%.
                            </ListItem>
                            <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Max no. of stolement you can create is 3 only
                            </ListItem>
                            <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            {loan.description}
                            </ListItem>
                        </List>
                        <Box w="80%" pt={7}>
                            <Button onClick={()=>{handleTakeLoan(loan)}} w="full" colorScheme="red">
                            Take Loan
                            </Button>
                        </Box>
                        </VStack>
                    </Box>
                    </PriceWrapper>
                ))
            }
        
      </Wrap>
    </Box>
  )
}