import { Box, MenuItem, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';
import CustomTextField from 'components/mui/text-field';
import ReactApexChart from 'react-apexcharts';

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
];

const RevenueReport = ({revenue}) => {
  const theme = useTheme();
  const colors = Array(9).fill(theme.palette.primary.main);
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
    tooltip: { enabled: true },
    dataLabels: {
      offsetY: -15,
      formatter: (val) => `${val}k`,
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
      show: true,
      padding: {
        top: 20,
        left: -5,
        right: -8,
        bottom: -12
      }
    },
    xaxis: {
      lines : { show: true },
      axisTicks: { show: true },
      axisBorder: { color: theme.palette.divider },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          // colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    yaxis: {
      lines : {
        show : true
      },
      labels: {
        offsetX: -15,
        formatter: (val) => `₹${val}k`,
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
            bar: { 
              columnWidth: '60%' ,
              distributed: true
            }
          },
          grid: {
            padding: { right: 20 }
          }
        }
      }
    ]
  };

  return (
    <Box>
      <Box component={'h2'} sx={{ fontSize: 16, mb: 2.5 }}>
        Revenue
      </Box>
      <Card  sx={{ boxShadow : "none", border : "1px solid #E5E7EB", borderRadius: "8px"}} >
        <CardHeader
          // action={
          //   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          //     <Typography sx={{ mr: 2, fontSize: 12 }}>Sort By:</Typography>
          //     <CustomTextField select defaultValue={10} id="custom-select">
          //       <MenuItem value={10}>Month</MenuItem>
          //       <MenuItem value={20}>Year</MenuItem>
          //     </CustomTextField>
          //   </Box>
          // }
          sx={{ pb: 0 }}
        />
        <CardContent>
          <ReactApexChart type="bar" options={options} series={[{data:revenue}] || []} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RevenueReport;
