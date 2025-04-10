import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';

const StyledBox1 = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.action.hover
}));

const StyledBox2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '5px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.action.hover
}));

const HelpFooter = () => {
  return (
    <Box sx={{ borderTop : '1px solid #ddd', }}>

      <Box sx={{display: 'flex', flexDirection: 'row' , justifyContent: 'space-between', padding: '15px'}}>
        <Grid item xs={12} md={6} sx={{borderRight: '1px solid #ddd'}}>
          <StyledBox1>
            <CustomAvatar skin="light" variant="rounded" sx={{ mb: 2.5, height: 38, width: 38 }}>
              <Icon fontSize="1.75rem" icon="tabler:phone" />
            </CustomAvatar>
            <Typography
              href="/"
              variant="h4"
              onClick={(e) => e.preventDefault()}
              sx={{ mb: 2.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              + (810) 2548 2568
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>We are always happy to help!</Typography>
          </StyledBox1>
        </Grid>
        <Grid item xs={12} md={6} sx={{borderRight: '1px solid #ddd' }}>
          <StyledBox1>
            <CustomAvatar skin="light" variant="rounded" sx={{ mb: 2.5, height: 38, width: 38 }}>
              <Icon fontSize="1.75rem" icon="tabler:phone" />
            </CustomAvatar>
            <Typography
              href="/"
              variant="h4"
              onClick={(e) => e.preventDefault()}
              sx={{ mb: 2.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              + (810) 2548 2568
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>We are always happy to help!</Typography>
          </StyledBox1>
        </Grid>

        <Grid item xs={12} md={6} sx={{borderRight: '1px solid #ddd'}}>
          <StyledBox1>
            <CustomAvatar skin="light" variant="rounded" sx={{ mb: 2.5, height: 38, width: 38 }}>
              <Icon fontSize="1.75rem" icon="tabler:mail" />
            </CustomAvatar>
            <Typography
              href="/"
              variant="h4"
              onClick={(e) => e.preventDefault()}
              sx={{ mb: 2.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              hello@help.com
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Best way to get answer faster!</Typography>
          </StyledBox1>
        </Grid>
        <Grid item xs={12} md={6} >
          <StyledBox1>
            <CustomAvatar skin="light" variant="rounded" sx={{ mb: 2.5, height: 38, width: 38 }}>
              <Icon fontSize="1.75rem" icon="tabler:mail" />
            </CustomAvatar>
            <Typography
              href="/"
              variant="h4"
              onClick={(e) => e.preventDefault()}
              sx={{ mb: 2.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              hello@help.com
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Best way to get answer faster!</Typography>
          </StyledBox1>
        </Grid>
      </Box>
    </Box>
  );
};

export default HelpFooter;
