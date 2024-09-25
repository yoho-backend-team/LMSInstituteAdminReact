import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AllActivity from './card/Allactivity';
import CardData from './card/CardData';
import CardPopularCourse from './card/CardPopularCourse';
import CardProjectStatus from './card/CardProjectStatus';
import CardStatsVertical from './card/CardStatsVertical';
import RevenueReport from './card/RevenueReport';
import CardSupportTracker from './card/CardSupportTracker';
import DashboardSkeleton from 'components/cards/Skeleton/DashboardSkeleton';
import client from 'api/client';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [Reports,setReports] = useState([])
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId)
  const { show, hide } = useSpinner()

  useEffect(() => {
    const getReports = async (props) => {
      try {
        show()
        const response = await client.reports.get(props)
        setReports(response) 
      } catch (error) {
        toast.error(error?.message)
      }finally{
        hide()
      }
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    const data = { branch : selectedBranchId }
    getReports(data)
    return () => clearTimeout(timer);
  }, [selectedBranchId]);

  return (
    <Grid container spacing={1} className="match-height">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8.5}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} lg={3}>
                  <CardStatsVertical
                    // sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)"}}
                    stats={Reports?.totalBalance}
                    chipText="-12.2%"
                    chipColor="default"
                    avatarColor="error"
                    title="Total Earnings"
                    subtitle="Last week"
                    avatarIcon="healthicons:money-bag"
                  />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                  <CardStatsVertical
                    // sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)"}}
                    stats={Reports?.totalPaidAmount}
                    chipText="+25.2%"
                    avatarColor="info"
                    chipColor="default"
                    title="Payouts"
                    subtitle="Last week"
                    avatarIcon="mingcute:wallet-fill"
                  />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                  <CardStatsVertical
                    // sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)"}}
                    stats={Reports?.TeachingstaffCount}
                    chipText="-12.2%"
                    chipColor="default"
                    avatarColor="success"
                    title="Instructor"
                    subtitle="Last week"
                    avatarIcon="ic:baseline-money"
                  />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                  <CardStatsVertical
                    // sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)"}}
                    stats={Reports?.studentCount}
                    chipText="+25.2%"
                    avatarColor="primary"
                    chipColor="default"
                    title="Students"
                    subtitle="Last week"
                    avatarIcon="ph:student"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <RevenueReport revenue={Reports?.revenue} />
                </Grid>
                <Grid item xs={12} md={5}>
                  <CardPopularCourse courses = {Reports?.popularCourses} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} lg={3} >
                  <CardData
                    sx={{ boxShadow : "none"}}
                    stats={Reports?.mainCategory}
                    chipText="-12.2%"
                    chipColor="default"
                    avatarColor="error"
                    title="Main"
                    subtitle="Last week"
                    avatarIcon="healthicons:money-bag"
                  />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                  <CardData
                    sx={{ boxShadow : "none"}}
                    stats={Reports?.categoryCount}
                    chipText="-12.2%"
                    chipColor="default"
                    avatarColor="error"
                    title="Category"
                    subtitle="Last week"
                    avatarIcon="ic:baseline-money"
                  />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                  <CardData
                    sx={{ boxShadow : "none"}}
                    stats={Reports?.courseCount}
                    chipText="+25.2%"
                    avatarColor="info"
                    chipColor="default"
                    title="Courses"
                    subtitle="Last week"
                    avatarIcon="mingcute:wallet-fill"
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} lg={3}>
                  <CardData
                    stats="4321"
                    chipText="+25.2%"
                    avatarColor="info"
                    chipColor="default"
                    title="Sub Category"
                    subtitle="Last week"
                    avatarIcon="ph:student"
                  />
                </Grid> */}
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CardProjectStatus />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardSupportTracker />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3.5}>
            <Grid container>
              <Grid item xs={12}>
                <AllActivity />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
