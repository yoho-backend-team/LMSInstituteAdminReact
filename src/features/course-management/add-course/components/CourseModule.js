import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CardWidgetsEarningReports from './CourseModuleCard';
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

  const [value, setValue] = useState('1');
  const [tabs, setTabs] = useState([
    {
      id: '1',
      label: 'Tab 1',
      content:
        'Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly cake caramels brownie gummies.'
    }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newTabId = String(tabs.length + 1);
    const newTab = { id: newTabId, label: `Tab ${newTabId}`, content: 'New tab content' };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setValue(newTabId);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ display: 'flex' }}>
          <TabList orientation="vertical" onChange={handleChange} aria-label="customized vertical tabs example">
            {tabs.map((tab,index) => (
              <Tab key={tab.id} value={tab.id} label={tab.label} sx={{ background: 'red', mt: index !== 0 ? 1 : 0 }} />
            ))}
          </TabList>
          {tabs.map((tab) => (
            <TabPanel key={tab.id} value={tab.id}>
              <CardWidgetsEarningReports />
            </TabPanel>
          ))}
        </Box>
      </TabContext>
      <Button onClick={handleAddTab} variant="contained" color="primary">
        Add Tab
      </Button>
    </div>
  );
};

export default DynamicTabsExample;
