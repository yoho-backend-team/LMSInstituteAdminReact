// material-ui
// import { Typography } from '@mui/material';

// project imports
// import MainCard from 'components/cards/MainCard';
import { useState } from 'react';
import CustomizedInput from 'features/course-management/add-course/components/CustomizedInput';

// ==============================|| SAMPLE PAGE ||============================== //

const Fee = () => {
  const [features, setFeatures] = useState([]);
  return (
    <CustomizedInput
      placeholder={'Add New Features'}
      data={features}
      setData={setFeatures}
      cardTitle={'Course Features'}
      buttonTitle={'Add Corse Feature'}
    />
  );
};

export default Fee;
