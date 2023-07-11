import * as yup from 'yup';

const validations = yup.object().shape({
    date: yup.date().required("Required field!"),
    explanation: yup.string(),
    amount: yup.number().required("Required field!")
})

export default validations