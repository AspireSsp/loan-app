import React, { useState } from 'react';
import MDEediter from './MDEediter';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,useToast,
  } from '@chakra-ui/react';
  import axios from 'axios';
import { baseUrl } from '../apis';
import { UserState } from '../context/user';
const EditLoan = ({loan, getAllLoans}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast()

    const [title, setTitle] = useState(loan?.title ? loan.title : '');
    const [description, setDescription] = useState(loan?.description ? loan.description : '');
    const [amount, setAmount] = useState(loan?.amount ? loan.amount : '');
    const [interestRate, setInterestRate] = useState(loan?.interestRate ? loan.interestRate : '');
    const [repaymentPeriod, setRepaymentPeriod] = useState(loan?.repaymentPeriod ? loan.repaymentPeriod : '');
    const [status, setStatus] = useState('');
    const { user, setUser } = UserState();

    const handleSubmit = async()=>{
        try {
            const body = {
                title, description, amount, interestRate, repaymentPeriod, createdBy: user._id
            }
            const res = await axios.patch(`${baseUrl}loan/update/${loan._id}`, body);
            console.log(res);
            if(res.status===200){
                onClose();
                getAllLoans();
            }
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'some error occured while adding loan.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
    }

  return (
      <>
        <Button m={2} colorScheme='blue' onClick={onOpen}>Edit</Button>
       
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Loan</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>title</FormLabel>
                <Input value={title} ref={initialRef} placeholder='First name' onChange={(e)=>{setTitle(e.target.value)}} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>description</FormLabel>
                <MDEediter description={description} setDescription={setDescription} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>amount</FormLabel>
                <Input value={amount} placeholder='amount' onChange={(e)=>{setAmount(e.target.value)}}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>interestRate</FormLabel>
                <Input value={interestRate} placeholder='interestRate' onChange={(e)=>{setInterestRate(e.target.value)}}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>repaymentPeriod</FormLabel>
                <Input value={repaymentPeriod} placeholder='repaymentPeriod' onChange={(e)=>{setRepaymentPeriod(e.target.value)}}/>
              </FormControl>



            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}

export default EditLoan
