import { Box, MenuItem, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';
import CustomTextField from 'components/mui/text-field';
import ReactApexChart from 'react-apexcharts';

const RevenueReport = ({ revenue }) => {
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
        columnWidth: '25%',
        startingShape: 'rounded',
        dataLabels: { position: 'top' },
        
      }
    },
    legend: { show: false },
    tooltip: { enabled: true },
    dataLabels: {
      offsetY: -10,
      formatter: (val) => `${val}k`,
      style: {
        fontWeight: 500,
        colors: [theme.palette.text.secondary],
        fontSize: theme.typography.body1.fontSize
      }
    },
    colors,
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    grid: {
      show: true,
      padding: { top: 20, left: 0, right: 0, bottom: 10 }
    },
    xaxis: {
      axisTicks: { show: true },
      axisBorder: { color: theme.palette.divider },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        },
        
        padding: 30, 
      },
      tickAmount: 12,
      tickPlacement: 'between', 
    }
    
,    
    yaxis: {
      labels: {
        offsetX: -10,
        formatter: (val) => `₹${val}k`,
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem',
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%', distributed: true }
          },
          grid: { padding: { right: 20 } }
        }
      }
    ]
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
  {/* Properly aligned heading */}
  <Typography variant="h5" sx={{ mb: 2.5, fontWeight: 600, textAlign: 'left', mt: 2, marginBottom: '26px' }}>
    Revenue
  </Typography>

  {/* Increased Card size with background color */}
  <Card
    sx={{
      boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
      borderRadius: '8px',
      minHeight: 450,
      backgroundColor: '#f0f9ff', // Light blue background for the Card
    }}
  >
    
    <CardContent sx={{ p: 3 }}>
      <ReactApexChart type="bar" options={options} series={[{ data: revenue }]} height={320} />
    </CardContent>
  </Card>
</Box>

  );
};

export default RevenueReport;
