import { Grid, Select, Menu, MenuItem, Button, FormControl, InputLabel, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AllActivity from './card/Allactivity';
import CardData from './card/CardData';
import CardPopularCourse from './card/CardPopularCourse';
import CardProjectStatus from './card/CardProjectStatus';
import CardStatsVertical from './card/CardStatsVertical';
import RevenueReport from './card/RevenueReport';
import ExpenseReport from './card/ExpenseReport';
import CardSupportTracker from './card/CardSupportTracker';
import DashboardSkeleton from 'components/cards/Skeleton/DashboardSkeleton';
import client from 'api/client';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';
import Joyride from 'react-joyride';
import secureLocalStorage from 'react-secure-storage';

import Tour from 'components/tour/Tour';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlipChart from './card/FlipChart';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [Reports, setReports] = useState([]);
  const [tourRun, setTourRun] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { show, hide } = useSpinner();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [chartType, setChartType] = useState('revenue');

  const steps = [
    {
      target: '.header',
      content: "Welcome!,Let's see the Features.",
      disableBeacon: true
    },
    {
      target: '.features',
      content: 'Explore our features here.',
      disableBeacon: true
    },
    {
      target: '.earnings',
      content: 'This is our earnings section.',
      disableBeacon: true
    },
    {
      target: '.pays',
      content: 'This is our total payouts section.',
      disableBeacon: true
    },
    {
      target: '.instructors',
      content: 'It shows the Instructor counts.',
      disableBeacon: true
    },
    {
      target: '.students',
      content: 'This is our students count.',
      disableBeacon: true
    },
    {
      target: '.courses',
      content: 'Total courses we have.',
      disableBeacon: true
    },
    {
      target: '.revenue',
      content: 'This is the total revenue section for Every Month.',
      disableBeacon: true
    },
    {
      target: '.popular',
      content: 'This is the total revenue section for Every Month.',
      disableBeacon: true
    }
  ];

  const getReports = async (props) => {
    try {
      show();
      const response = await client.reports.get(props);
      setReports(response);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const data = { branch: selectedBranchId };
    getReports(data);

    return () => clearTimeout(timer);
  }, [selectedBranchId]);

  const handleFilter = () => {
    const data = { branch: selectedBranchId, month: selectedMonth, year: selectedYear };
    getReports(data);
  };
  useEffect(() => {
    if (!secureLocalStorage.getItem('tourCompleted')) {
      setTourRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      secureLocalStorage.setItem('tourCompleted', 'true');
      setTourRun(false);
    }
    console.log('Filtering for:', selectedMonth, selectedYear);
    handleClose();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2} className="match-height">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Grid container spacing={2} sx={{ pt: '22px', pl: '22px' }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Grid item gap={2} sx={{ p: 2, display: 'flex' }}>
              <Box sx={{ mb: 9 }}>
                <Button variant="contained" color="primary" onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
                  Choose Period
                </Button>

                <Menu
                  sx={{ mt: 1 }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ 'aria-labelledby': 'timeline-button' }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                  <Box sx={{ p: 2, width: 250 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Month</InputLabel>
                          <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            {Array.from({ length: 12 }, (_, i) => (
                              <MenuItem key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString('en', { month: 'long' })}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Year</InputLabel>
                          <Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: { maxHeight: 200 }
                              }
                            }}
                          >
                            {Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => (
                              <MenuItem key={i} value={2000 + i}>
                                {2000 + i}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleFilter}>
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Menu>
              </Box>
            </Grid>
          </Grid>
          {/* Top Stack Cards - Full Width */}
          <Joyride
            steps={steps}
            continuous={true}
            showSkipButton={true}
            showProgress={true}
            disableBeacon={true}
            run={tourRun}
            callback={handleJoyrideCallback}
          />
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4} className="earnings">
                <CardStatsVertical
                  stats={Reports?.totalBalance}
                  chipText="-12.2%"
                  chipColor="default"
                  iconBg="#00796b"
                  avatarColor="#004d40"
                  title="Total Earnings"
                  subtitle="Last week"
                  avatarIcon="healthicons:money-bag"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} className="pays">
                <CardStatsVertical
                  stats={Reports?.totalPaidAmount}
                  chipText="+25.2%"
                  iconBg="#1976d2"
                  avatarColor="#0d47a1"
                  chipColor="default"
                  title="Payouts"
                  subtitle="Last week"
                  avatarIcon="material-symbols:paid-outline"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} className="instructors">
                <CardStatsVertical
                  stats={Reports?.TeachingstaffCount}
                  chipText="-12.2%"
                  iconBg="#689f38"
                  chipColor="default"
                  avatarColor="#33691e"
                  title="Instructor"
                  subtitle="Last week"
                  avatarIcon="mdi:teacher"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} className="students">
                <CardStatsVertical
                  stats={Reports?.studentCount}
                  chipText="+25.2%"
                  iconBg="#fb8c00"
                  avatarColor="#e65100"
                  chipColor="default"
                  title="Students"
                  subtitle="Last week"
                  avatarIcon="ph:student"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} className="courses">
                <CardStatsVertical
                  bg={'#d81b60'}
                  stats={Reports?.courseCount}
                  chipText="+25.2%"
                  avatarColor="#880e4f"
                  chipColor="default"
                  title="Courses"
                  subtitle="Last week"
                  avatarIcon="tabler:books"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8.5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                {/* <RevenueReport revenue={Reports?.revenue} /> */}
                <FlipChart revenue={Reports?.revenue} expense={Reports?.expense} />
              </Grid>

              <Grid item xs={12} md={5}>
                <CardPopularCourse courses={Reports?.popularCourses} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <AllActivity />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardProjectStatus />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardSupportTracker />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
