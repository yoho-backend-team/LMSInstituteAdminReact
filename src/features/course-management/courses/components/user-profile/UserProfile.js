// ** React Imports
import { useState } from 'react';

// ** MUI Components
import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Demo Components
import Modules from './modules';
import Overview from './overview';
import Projects from './projects';
import SkillsAndTools from './skillsAndTools';

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
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
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}));

const UserProfile = () => {
  const tab = 'overview';
  // ** State
  const [activeTab, setActiveTab] = useState(tab);
  const [isLoading] = useState(false);

  // ** Hooks
  const hideText = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleChange = (e,value) => {
    console.log(e);
    setActiveTab(value);
  };

  const tabContentList = {
    overview: <Overview  />,
    skillsAndTools: <SkillsAndTools />,
    projects: <Projects  />,
    modules: <Modules/>
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList variant="scrollable" scrollButtons="auto" onChange={handleChange} aria-label="customized tabs example">
                <Tab
                  value="overview"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      {!hideText && 'Overview'}
                    </Box>
                  }
                />
                <Tab
                  value="skillsAndTools"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      {!hideText && 'Skills & Tools'}
                    </Box>
                  }
                />
                <Tab
                  value="projects"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      {!hideText && 'Projects'}
                    </Box>
                  }
                />
                <Tab
                  value="modules"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      {!hideText && 'Modules'}
                    </Box>
                  }
                />
              </TabList>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
