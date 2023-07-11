
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Table, } from "antd";
import validationSchema from './expenseValidations'
import { useFormik } from "formik";
import { deleteExpense, bringExpense, saveExpense } from "../../../api";
import {
  GridItem,
  Input,
  Button,
  Grid,
Text,
  InputGroup,
  InputLeftElement,
  FormControl,
  
  Select
} from '@chakra-ui/react'
import { useMemo, useState } from 'react';

const current = new Date();

function Expense() {
  // const [filterData, setFilterData] = useState('')
  const date = new Date().toISOString().slice(0,10);

  const newExpenseMutation = useMutation(saveExpense, {
    onSuccess: () => queryClient.invalidateQueries("expense:bring")
  })

  const handleSubmit = async (values,bag) => {
      newExpenseMutation.mutate(values)
  }
  
  const formik = useFormik({
    initialValues: {
      user:localStorage.getItem('userid'),
        date:date,
        explanation:"",
        amount:"",
        category:""
    },
    
    validationSchema,
    onSubmit : handleSubmit   
    
  });
  
  
  const {data} = useQuery({ queryKey: ['expense:bring'], queryFn: bringExpense })
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation(deleteExpense ,{onSuccess : () => queryClient.invalidateQueries('expense:bring') })
 

  let sortedDate = ((a, b) => Date.parse(new Date(a.tarih.split("/").reverse().join("-"))) - Date.parse(new Date(b.date.split("/").reverse().join("-"))))

  const columns = useMemo(() => {
    return [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Explanation',
      dataIndex: 'explanation',
      key: 'explanation',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: sortedDate,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags, record) => (
        <>
       <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={()=> {deleteMutation.mutate(record._id)}}
    onCancel={() => {console.log("error while deleting");}}
    okText="Yes"
    cancelText="No"
    placement='left'
  >
    <Button type="link">Delete</Button>
  </Popconfirm>
        </>
      )
  },
  ]
},[])

// const filtered = data.filter((item) => {
//   return Object.keys(item).some((key) => 
//     item[key]
//     .toString()
//     .toLowerCase()
//     .includes(filterData.toLocaleLowerCase())
//   )
// })
  

  return (
    <div>

<Input left="500px" placeholder='Filter' width='auto' borderColor="darkblue"/>


<Text fontSize='3xl' w="300px">EXPENSES</Text>
          
<br></br>


<form onSubmit={formik.handleSubmit}>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>

        <Select left="10px" id='category'
        value={formik.values.category} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}

      >
       <option value="">Choose..</option>
       <option value="Rent">Rent</option>
       <option value="Entertainment">Entertainment</option>
       <option value="Service">Service</option>
       <option value="Health">Health</option>
        <option value="Diğer">Other</option>
      </Select>

          <GridItem>
            
          <FormControl>
          

          <Input
           name='date' 
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
        borderColor="green"
        w="300px"
        placeholder="Select date.."
        size="md"
        />
          </FormControl>
          </GridItem>
          
          <GridItem>
          <FormControl>
          <Input name='explanation' type="text" placeholder='Enter description..' w="400px" borderColor="green"
            onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.explanation}/>
          </FormControl>
          </GridItem>

         <GridItem>
         <FormControl>
          <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
      children='₺'
      textColor="green"
    />
    <Input name='amount' type="string" placeholder='Enter amount..' w="300px"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.amount}
    borderColor="green"
      width='200px'/>
  </InputGroup>

  
          </FormControl>
         </GridItem>

          
<GridItem w="100px">
<FormControl>
<Button left="1200px" bgColor="cyan.100 " w="150px" type='submit' >Add</Button>
          
          </FormControl>
</GridItem>
          

          </Grid>
        </form>

<br>
</br>
<br>

</br>
<Table dataSource={data} columns={columns} rowKey="_id"/>
<br></br>
<br></br>

</div>
  );
  }

export default Expense;
