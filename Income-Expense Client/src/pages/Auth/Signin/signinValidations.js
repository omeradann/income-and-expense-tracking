import * as yup from 'yup';


const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid e-mail or password.").required("Required field!"),
    password: yup.string().min(5, "Your password must be at least 5 characters.").required("Required field!"),
    
});

export default signInSchema;