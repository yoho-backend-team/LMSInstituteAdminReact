// material-ui
import { Grid } from '@mui/material';
// project imports
import OfflineExamCard from 'features/exam-management/offline-exams/components/OfflineExamCard';
import OfflineExamCardHeader from 'features/exam-management/offline-exams/components/OfflineExamCardHeader';
import OfflineExamFilterCard from 'features/exam-management/offline-exams/components/OfflineExamFilterCard';
// ==============================|| SAMPLE PAGE ||============================== //

const OfflineExam = () => {
  return (
    <>
      <Grid>
        <OfflineExamFilterCard />
        <OfflineExamCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <OfflineExamCard />
        </Grid>
      </Grid>
    </>
  );
};

export default OfflineExam;
