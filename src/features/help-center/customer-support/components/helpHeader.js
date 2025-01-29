import { TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import IconifyIcon from 'components/icon';
import CustomAutocomplete from 'components/mui/autocomplete';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Autocomplete = styled(CustomAutocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    paddingLeft: theme.spacing(3.5),
    backgroundColor: theme.palette.background.paper
  },
  width: '100%'
}));

const HelpHeader = ({ allArticles }) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <>
      <CardContent sx={{ textAlign: 'center', p: 4 }}>
        <Typography sx={{ fontWeight: 500, fontSize: '1.625rem', mb: 2 }}>Hello, How can we help you</Typography>
        <Autocomplete
          open={open}
          disablePortal
          inputValue={value}
          options={allArticles}
          onClose={() => setOpen(false)}
          onChange={(event, option) => handleRedirection(option)}
          onInputChange={(event, value) => {
            setValue(value);
            setOpen(!!event.target.value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search here"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon icon="tabler:search" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex' }}>
        <List sx={{ width: '35%', borderRight: '1px solid #ddd', p: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>For assistance related to your orders</Typography>
          {['Class ', 'Payment slip', 'Id Card Pdf ', ' Pay', 'Class updated'].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{ width: '65%', p: 2 }}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>For assistance related to your orders</Typography>
          {['Track Your Package', 'Find a Missing Package', 'Shipping Speeds', 'Shipment is Late', 'Secure Delivery'].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </>
  );
};

HelpHeader.propTypes = {
  allArticles: PropTypes.any
};

export default HelpHeader;
