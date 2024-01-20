// material-ui
import { Grid } from '@mui/material';
// project imports

import OnlineExamCard from 'features/exam-management/online-exams/components/OnlineExamCard';
import OnlineExamCardHeader from 'features/exam-management/online-exams/components/OnlineExamCardHeader';
import OnlineExamFilterCard from 'features/exam-management/online-exams/components/OnlineExamFilterCard';
// ==============================|| SAMPLE PAGE ||============================== //

const OnlineExam = () => {
  return (
    <>
      <Grid>
        <OnlineExamFilterCard />
        <OnlineExamCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <OnlineExamCard />
        </Grid>
      </Grid>
    </>
  );
};

export default OnlineExam;
