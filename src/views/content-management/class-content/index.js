// material-ui
import ExamPaperDataGrid from 'features/content-management/exam-contents/components/ExamPaperDatGrid';
import ExamPaperFilterCard from 'features/content-management/exam-contents/components/ExamPaperFilterCard';
import Card from '@mui/material/Card';
// ==============================|| SAMPLE PAGE ||============================== //

const ExamPaper = () => {
  return (
    <Card>
      <ExamPaperFilterCard />
      <ExamPaperDataGrid />
    </Card>
  );
};

export default ExamPaper;
