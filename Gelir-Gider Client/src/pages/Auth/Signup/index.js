import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Alert,
  FormErrorMessage,
} from "@chakra-ui/react";
import validationSchema from "./signupValidations";
import { fetchKayitOl } from "../../../api";
import {useAuth} from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom'


function Signup() {
  
  const {login} = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      //formik olmasaydı bu kısıma if yapısıyla kontrol edecektik
      try {
        const registerResponse = await fetchKayitOl({
          email: values.email,
          password: values.password,
        });

       
        if (registerResponse.hataKodu === 400) {
          bag.setErrors({ general: "Mail zaten kullanılıyor." });
        } else {
          console.log(registerResponse); 
          login(registerResponse);
          navigate('/profile')
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  //   const queryClient = new QueryClient()
  //   <QueryClientProvider client={queryClient}>
  //      const { isLoading, error} = useQuery({queryKey: ["repoData"], queryFn: fetchKayıtOl})
  //     </QueryClientProvider>

  //   if (isLoading) return 'Loading...'

  //   if (error) return 'An error has occurred: ' + error.message

  // console.log(errors);
  return (
    <div className="signuppage">
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box>
            <Heading>KAYIT OL</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl mt="4">
                <FormLabel>Email Address</FormLabel>
                <Input
                id="useremail"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.errors.email && formik.touched.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>

                <br></br>
                <br></br>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.errors.password && formik.touched.password}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                <br></br>
                <br></br>
                <FormLabel htmlFor="confirmpassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="userpassword"
                  name="confirmpassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                />

                {formik.errors.confirmpassword &&
                  formik.touched.confirmpassword && (
                    <div>{formik.errors.confirmpassword}</div>
                  )}
                <br></br>
                <br></br>

                <Button mt="4" type="submit" colorScheme="blue">
                  Onayla
                </Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
