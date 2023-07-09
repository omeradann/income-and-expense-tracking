import * as yup from 'yup';


const signUpSchema = yup.object().shape({
    email: yup.string().email("Geçerli bir email giriniz.").required("Zorunlu alan!"),
    password: yup.string().min(5, "Parolanız en az 5 karakter olmalıdır.").required("Zorunlu alan!"),
    confirmpassword: yup.string().oneOf([yup.ref('password')] , "Parolalar uyuşmuyor.").required("Zorunlu alan!"), //yup.ref mantığı passwordu kontrol edip aynı olup olmadığına bakar
});

export default signUpSchema;