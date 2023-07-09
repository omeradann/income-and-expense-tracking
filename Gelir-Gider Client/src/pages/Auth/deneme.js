import React from 'react'

function deneme() {
  return (
    
    class ApexChart extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
        
          series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
          options: {
            chart: {
              type: 'polarArea',
            },
            stroke: {
              colors: ['#fff']
            },
            fill: {
              opacity: 0.8
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
        
        
        };
      }

    

      render() {
        return (
          

    <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" />
</div>
  )
}

export default deneme