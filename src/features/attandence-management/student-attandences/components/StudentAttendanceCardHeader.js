import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const StudentAttendanceCardHeader = (props) => {
  const { value, handleFilter } = props;
  return (
    <>
      <Box
        sx={{
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
          placeholder="Search Student"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </Box>
    </>
  );
};

StudentAttendanceCardHeader.propTypes = {
  value: PropTypes.any,
  handleFilter: PropTypes.any
};

export default StudentAttendanceCardHeader;
