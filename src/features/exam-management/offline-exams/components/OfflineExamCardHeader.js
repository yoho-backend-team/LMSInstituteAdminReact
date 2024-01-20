import React from 'react'
// ** Next Import
// import Link from 'next/link';
import {Link} from 'react-router-dom'
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon'
// ** Custom Component Import
import { TextField } from '@mui/material';

const OfflineExamCardHeader = (props) => {
    const { value, handleFilter } = props;

    return (
      <Box
      sx={{
        // p: 5,
        pb: 1,
        pt: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <TextField
        value={value}
        sx={{
          width: 400
        }}
        placeholder="Search Exams"
        onChange={(e) => handleFilter(e.target.value)}
      />
  
      <Box component={Link} to='add' sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
        <Button  variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
          Add New Exam
        </Button>
      </Box>
    </Box>
    );
}

export default OfflineExamCardHeader











