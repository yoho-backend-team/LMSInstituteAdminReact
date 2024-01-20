// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
// import CardMedia from '@mui/material/CardMedia';
import CourseInputCard from './CourseVideoInput';
// ** Custom Components Import
import Icon from 'components/icon';
// import OptionsMenu from 'components/option-menu';
import CustomAvatar from 'components/mui/avatar';
// import ReactApexChart from 'react-ape/xcharts';
import Grid from '@mui/material/Grid';
// ** Util Import
import { hexToRGBA } from 'utils/hex-to-rgba';
import CustomizedInput from './CustomizedInputWithoutCard';
import { IconButton } from '@mui/material';

const tabData = [
  {
    type: 'description',
    avatarIcon: 'tabler:shopping-cart',
    series: [{ data: [28, 10, 45, 38, 15, 30, 35, 28, 8] }]
  },
  {
    type: 'video',
    avatarIcon: 'tabler:chart-bar',
    series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30] }]
  }
];

const renderTabs = (value, theme) => {
  return tabData.map((item, index) => {
    const RenderAvatar = item.type === value ? CustomAvatar : Avatar;

    return (
      <Tab
        key={index}
        value={item.type}
        label={
          <Box
            sx={{
              width: 110,
              height: 94,
              borderWidth: 1,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'center',
              borderStyle: item.type === value ? 'solid' : 'dashed',
              borderColor: item.type === value ? theme.palette.primary.main : theme.palette.divider
            }}
          >
            <RenderAvatar
              variant="rounded"
              {...(item.type === value && { skin: 'light' })}
              sx={{ mb: 2, width: 34, height: 34, ...(item.type !== value && { backgroundColor: 'action.selected' }) }}
            >
              <Icon icon={item.avatarIcon} />
            </RenderAvatar>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>{item.type}</Typography>
          </Box>
        }
      />
    );
  });
};

const CardWidgetsEarningReportsWithTabs = ({ module }) => {
  // ** State
  const [value, setValue] = useState('description');
  const [features, setFeatures] = useState([]);
  // ** Hook
  const theme = useTheme();
  const renderTabPanels = () => {
    return tabData.map((item, index) => {
      return (
        <TabPanel key={index} value={item.type}>
          {index === 0 && (
            <Grid sx={{ mt: 3 }}>
              <CustomizedInput
                placeholder={'Add New Features'}
                data={features}
                setData={setFeatures}
                cardTitle={'Course Features'}
                buttonTitle={'Add Corse Feature'}
              />
            </Grid>
          )}
          {index === 1 && <CourseInputCard />}
        </TabPanel>
      );
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const colors = Array(9).fill(hexToRGBA(theme.palette.primary.main, 0.16));

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
        formatter: (val) => `$${val}k`,
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
          }
        }
      }
    ]
  };

  return (
    <Card>
      <CardHeader
        title={module}
        action={
          <IconButton aria-label="capture screenshot" color="primary">
            <Icon icon="tabler:pencil" />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .MuiTabPanel-root': { p: 0 } }}>
        <TabContext value={value}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            aria-label="earning report tabs"
            sx={{
              border: '0 !important',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': { p: 0, minWidth: 0, borderRadius: '10px', '&:not(:last-child)': { mr: 4 } }
            }}
          >
            {renderTabs(value, theme)}
          </TabList>
          {renderTabPanels(value, theme, options, colors)}
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default CardWidgetsEarningReportsWithTabs;
