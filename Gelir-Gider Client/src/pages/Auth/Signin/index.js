import React from 'react'
import { Flex, Heading,Box,FormControl,FormLabel,Input,Button,Alert, FormErrorMessage } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

import {useFormik} from 'formik'

import validationSchema from './signinValidations'

import {useAuth} from '../../../context/AuthContext';
import { fetchLogin } from '../../../api';


function Signin() {

const navigate = useNavigate();

const handleLogin = () => {
    navigate("/")
  }


    const {login} = useAuth();

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema,
        onSubmit: async (values ,bag) => {
            try {
                const loginResponse = await fetchLogin({email : values.email , password: values.password});
                if (loginResponse.errorCode === 400 ) {
                    bag.setErrors({general : "Invalid e-mail or password!"});
                }
                else{
                    console.log(loginResponse);
                    login(loginResponse);
                    handleLogin();
                }      
            } catch (e) {
                console.log(e);
            }
        }
    })

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
            <Box>
                <Heading>SIGN IN</Heading>
            </Box>
            <Box my={5}>
                {
                    formik.errors.general && (
                        <Alert status='error'>
                            {formik.errors.general}
                        </Alert>
                    )
                }
            </Box>
            <Box my={5} textAlign="left">
                <form onSubmit={formik.handleSubmit} >
                    <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                        <FormLabel>E-mail</FormLabel>
                            <Input name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        >
                            </Input>                        
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt={4} isInvalid={formik.touched.password && formik.errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input name='password' 
                        type="password" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        value={formik.values.password} ></Input>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    

                    <Button mt={4} width='full' type='submit' >
                        Sign in
                    </Button>
                </form>
            </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin
