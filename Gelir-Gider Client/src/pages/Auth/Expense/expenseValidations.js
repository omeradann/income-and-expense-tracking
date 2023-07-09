import * as yup from 'yup';

const validations = yup.object().shape({
    date: yup.date().required("zorunlu alan"),
    explanation: yup.string(),
    amount: yup.number().required("zorunlu alan")
})

export default validations