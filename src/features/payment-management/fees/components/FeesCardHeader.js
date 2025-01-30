import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';

const FeesCardHeader = (props) => {
  const { toggle, toggles } = props;

  return (
    <>
      <Box
        sx={{
          px: 1,
          pb: 1,
          pt: 1,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={toggles} variant="contained" color="primary" startIcon={<Icon icon="line-md:filter-twotone" />}>
            Filter
          </Button>
          <Typography variant="h2" ml={2}>Fees</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={toggle} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Fee
          </Button>
        </Box>
      </Box>
    </>
  );
};

FeesCardHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};
export default FeesCardHeader;
