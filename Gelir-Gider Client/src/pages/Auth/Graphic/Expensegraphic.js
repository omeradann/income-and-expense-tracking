import React from 'react'
import { Bar,Bubble,Chart,Doughnut,Line,Pie,PolarArea,Radar,Scatter,defaults } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement} from 'chart.js'; 
import { useQuery } from '@tanstack/react-query'
import { bringExpense } from '../../../api';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement); 

function Expensegraphic() {
    const { isLoading, error, data } = useQuery('expense:bring', bringExpense )

  if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
   
    
    const expense = {
     labels: ["Rent", "Salary", "Interest", "Trade", "Other"],
     datasets: [{
       label:"Amount",
       data: [bringExpense],
       backgroundColor: ["red", "green", "blue"],
       borderWidth: "1",
    
     }]
   }

   return <Pie data={expense} />;
}

export default Expensegraphic