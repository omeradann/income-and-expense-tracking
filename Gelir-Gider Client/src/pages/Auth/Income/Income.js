
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Table, } from "antd";
import validationSchema from './incomeValidations'
import { useFormik } from "formik";
import { deleteIncome, bringIncome, saveIncome } from "../../../api";
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

function Income() {
  const [filter, setFilter] = useState('')
  const date = new Date().toISOString().slice(0,10);

  const newGelirMutation = useMutation(saveIncome, {
    onSuccess: () => queryClient.invalidateQueries("income:bring")
  })

  const handleSubmit = async (values,bag) => {
      newGelirMutation.mutate(values)
  }
  
  const formik = useFormik({
    initialValues: {
      user:localStorage.getItem('userid'),
        date:date,
        explanation:"",
        amount:"",
        category:""
    },
 //formik olmasaydı bu kısıma if yapısıyla kontrol edecektik
    
    validationSchema,
    onSubmit : handleSubmit   
    
  });
  
  
  const { data } = useQuery({ queryKey: ['income:bring'], queryFn: bringIncome })
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation(deleteIncome ,{onSuccess : () => queryClient.invalidateQueries('income:bring') })
 

  let sortedDate = ((a, b) => Date.parse(new Date(a.tarih.split("/").reverse().join("-"))) - Date.parse(new Date(b.tarih.split("/").reverse().join("-"))))

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
    onCancel={() => {console.log("Error while deleting!");}}
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
//     .includes(filter.toLocaleLowerCase())
//   )
// })
  

  return (
    <div>

    {/* <Input left="500px" placeholder='Filter'  width='auto' borderColor="darkblue"
    onChange={(e) => filter(e.target.value)}/>
    <div>
      {
        data.filter((item)=> {
          if(filter==""){
            return item;
          }else if(filter.explanation.toLocalLowerCase().includes(filter.toLocaleLowerCase())){
            return item;
          }
        }).map((item)=>{
          return (
            <div className="data" key={item.id}>
              <p>{item.explanation}</p>
            </div>
          )
        })
      }
    </div> */}


<Text fontSize='3xl' w="300px">INCOMES</Text>
          
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
       <option value="Salary">Salary</option>
       <option value="Interest">Interest</option>
       <option value="Trade">Trade</option>
        <option value="Other">Other</option>
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
<Button left="1200px" bgColor="cyan.100 " w="150px" type='submit' > Add  </Button>
          
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

export default Income;
