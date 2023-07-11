import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { bringExpense } from '../../api';
import { Box, color, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { Bar,Bubble,Chart,Doughnut,Line,Pie,PolarArea,Radar,Scatter,defaults } from 'react-chartjs-2';
// import {Expensegraphic} from '../Auth/Graphic/Expensegraphic';
// import {Incomegraphic} from '../Auth/Graphic/Incomegraphic'


function AnaSayfa() {
  const { isLoading, error, data } = useQuery('expense:bring', bringExpense )

  if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message

   const veri = data;
  
  return (
    <div>
       <div>
      
      <Grid
  h='200px'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>
  
  


  {/* <GridItem rowSpan={1} colSpan={1} > <Heading as='h3' size='lg'>Gelirler</Heading> <br></br><Incomegraphic></Incomegraphic></GridItem> */}
  
  {/* <GridItem rowSpan={1} colSpan={1} > <Heading as='h3' size='lg'>Giderler</Heading> <br></br><Expensegraphic></Expensegraphic></GridItem> */}
  <br></br>
</Grid>
      
    </div>
    </div>
  )
}

export default AnaSayfa