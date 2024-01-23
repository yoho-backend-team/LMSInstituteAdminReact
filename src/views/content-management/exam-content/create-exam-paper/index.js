import { Grid } from '@mui/material';
import React from 'react';
import ExamPaperStepper from 'features/content-management/exam-contents/create-exam-paper/components/ExamPaperStepper';
const CreateExamPaper = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ExamPaperStepper />
      </Grid>
    </Grid>
  );
};

export default CreateExamPaper;
