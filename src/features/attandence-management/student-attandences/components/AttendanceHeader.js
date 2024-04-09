import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const AttendanceHeader = (props) => {
  const { value, handleFilter } = props;
  return (
    <>
      <Box
        sx={{
          px: 1,
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
          placeholder="Search Fee"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}></Box>
      </Box>
    </>
  );
};

AttendanceHeader.propTypes = {
  value: PropTypes.any,
  handleFilter: PropTypes.any
};

export default AttendanceHeader;
