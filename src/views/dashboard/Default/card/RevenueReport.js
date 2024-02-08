// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'

// ** Custom Components Import
import ReactApexChart from 'react-apexcharts'

// ** Util Import

const tabData = [
  {
    type: 'orders',
    avatarIcon: 'tabler:shopping-cart',
    series: [{ data: [28, 10, 45, 38, 15, 30, 35, 28, 8] }]
  },
  {
    type: 'sales',
    avatarIcon: 'tabler:chart-bar',
    series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30] }]
  },
  {
    type: 'profit',
    avatarIcon: 'tabler:currency-dollar',
    series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8] }]
  },
  {
    type: 'income',
    avatarIcon: 'tabler:chart-pie-2',
    series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48] }]
  }
]





const RevenueReport = () => {
  // ** State
 

  // ** Hook
  const theme = useTheme()
 
 
  const colors = Array(9).fill(theme.palette.primary.main)

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '35%',
        startingShape: 'rounded',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -15,
      formatter: val => `${val}k`,
      style: {
        fontWeight: 500,
        colors: [theme.palette.text.secondary],
        fontSize: theme.typography.body1.fontSize
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: 20,
        left: -5,
        right: -8,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: theme.palette.divider },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        formatter: val => `$${val}k`,
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          },
          grid: {
            padding: { right: 20 }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Earning Reports'
        subheader='Yearly Earnings Overview'
      />
      <CardContent>
        <ReactApexChart type='bar' height={263} options={options} series={tabData.find(tab => tab.type === 'sales')?.series || []} />
      </CardContent>
    </Card>
  )
}

export default RevenueReport
