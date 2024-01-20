// material-ui
// import { Typography } from '@mui/material';

// project imports
// import MainCard from 'components/cards/MainCard';
import { useState } from 'react';
import CustomizedInput from 'features/course-management/add-course/components/CustomizedInput';
import { Grid } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

const Fee = () => {
  const [features, setFeatures] = useState([]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CustomizedInput
          placeholder={'Add New Features'}
          data={features}
          setData={setFeatures}
          cardTitle={'Course Features'}
          buttonTitle={'Add Corse Feature'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomizedInput
          placeholder={'Add New Features'}
          data={features}
          setData={setFeatures}
          cardTitle={'Course Features'}
          buttonTitle={'Add Corse Feature'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomizedInput
          placeholder={'Add New Features'}
          data={features}
          setData={setFeatures}
          cardTitle={'Course Features'}
          buttonTitle={'Add Corse Feature'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomizedInput
          placeholder={'Add New Features'}
          data={features}
          setData={setFeatures}
          cardTitle={'Course Features'}
          buttonTitle={'Add Corse Feature'}
        />
      </Grid>
    </Grid>
  );
};

export default Fee;
