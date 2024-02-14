import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import AllActivity from './card/Allactivity';
import CardData from './card/CardData';
import CardPopularCourse from './card/CardPopularCourse';
import CardProjectStatus from './card/CardProjectStatus';
import CardStatsVertical from './card/CardStatsVertical';
import RevenueReport from './card/RevenueReport';
import CardSupportTracker from './card/CardSupportTracker';
import DashboardSkeleton from 'components/cards/Skeleton/DashboardSkeleton';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {loading ? (
            <DashboardSkeleton />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8.5}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} lg={3}>
                      <CardStatsVertical
                        stats="₹56,000"
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
                        stats="₹96,419"
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
                        stats="1,000"
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
                        stats="24,000"
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
                      <RevenueReport />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <CardPopularCourse />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} lg={3}>
                      <CardData
                        stats="8000"
                        chipText="-12.2%"
                        chipColor="default"
                        avatarColor="error"
                        title="Learning Path"
                        subtitle="Last week"
                        avatarIcon="healthicons:money-bag"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={3}>
                      <CardData
                        stats="2333"
                        chipText="+25.2%"
                        avatarColor="info"
                        chipColor="default"
                        title="Courses"
                        subtitle="Last week"
                        avatarIcon="mingcute:wallet-fill"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={3}>
                      <CardData
                        stats="4400"
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
                        stats="4321"
                        chipText="+25.2%"
                        avatarColor="info"
                        chipColor="default"
                        title="Sub Category"
                        subtitle="Last week"
                        avatarIcon="ph:student"
                      />
                    </Grid>
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
      </Grid>
    </>
  );
};

export default Dashboard;
