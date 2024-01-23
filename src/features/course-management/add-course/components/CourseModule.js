import React, { useState } from 'react';
// import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CardWidgetsEarningReports from './CourseModuleCard';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField } from '@mui/material';

const DynamicTabsExample = () => {
  const TabList = styled(MuiTabList)(({ theme }) => ({
    borderRight: 0,
    '&, & .MuiTabs-scroller': {
      boxSizing: 'content-box',
      padding: `${theme.spacing(1.25, 1.25, 2)}`,
      margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .Mui-selected': {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
      lineHeight: 1,
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        color: theme.palette.primary.main
      }
    }
  }));

  const theme = useTheme();
  const [value, setValue] = useState('1');
  const [moduleName, setModuleName] = useState('');
  const [tabs, setTabs] = useState([
    {
      id: '1',
      label: 'This is Introduction for react',
      content:
        'Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly cake caramels brownie gummies.'
    },
    {
      id: '2',
      label: 'Hooks in react',
      content:
        'Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly cake caramels brownie gummies.'
    },
    {
      id: '3',
      label: 'Components in react',
      content:
        'Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly cake caramels brownie gummies.'
    },
    {
      id: '4',
      label: 'States and props in react',
      content:
        'Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly cake caramels brownie gummies.'
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newTabId = String(tabs.length + 1);
    const newTab = { id: newTabId, label: moduleName, content: 'New tab content' };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setValue(newTabId);
    setModuleName('');
  };

  return (
    <div>
      <Grid container gap={2} sx={{ alignItems: 'center' }}>
        <Grid item xs={12} sm={4}>
          <TextField value={moduleName} onChange={(e) => setModuleName(e.target.value)} fullWidth />
        </Grid>
        <Grid xs={12} sm={5}>
          <Button onClick={handleAddTab} variant="contained" color="primary" disabled={!moduleName}>
            Add New Module
          </Button>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <TabList orientation="vertical" onChange={handleChange} aria-label="customized vertical tabs example">
              {tabs?.map((tab, index) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={tab.label}
                  sx={{
                    background: theme.palette.background.paper,
                    mt: index !== 0 ? 1 : 2,
                    maxWidth: 400
                  }}
                />
              ))}
            </TabList>
          </Grid>
          <Grid item xs={12} sm={8}>
            {tabs?.map((tab) => (
              <TabPanel key={tab.id} value={tab.id}>
                <CardWidgetsEarningReports module={tab.label} />
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </TabContext>
    </div>
  );
};

export default DynamicTabsExample;
