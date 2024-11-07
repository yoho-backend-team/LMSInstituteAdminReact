import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Avatar, Box, Card, CardContent, Grid, keyframes, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from 'utils/formatDate';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OpenTicketCard = ({ ticket }) => {
  
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ minHeight: 240,
        boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            cursor: "pointer"
          },
          animation: `${fadeInUp} 0.5s ease`,
       }}>
        <CardContent>
          <Box sx={{}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={ticket?.institute?.image ? getImageUrl(ticket?.institute?.image) : imagePlaceholder} sx={{ mr: 2.5, height: 42, width: 42, transition: "box-shadow 0.3 ease, transform 0.3 ease",
                ":hover": { transform: "scale(1.1)", boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"} }} />
              <Box>
                <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 600,}} >{ticket?.user?.first_name}</Typography>
                <Typography variant="body4"  sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 500 }} >
                  {ticket?.user?.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", my: 4 }}>
            <Typography
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              fontWeight: 500
            }}
          >
            {ticket?.query}
          </Typography>
              <Typography sx={{ fontSize: 14, color: 'primary.main' }}>{formatDate(ticket?.date)} - {formatTime(ticket?.date)}</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomChip
                icon={<CrisisAlertIcon />}
                rounded
                size="small"
                skin="light"
                color={'error'}
                label={`Priority:  ${ticket?.priority}`}
              />
            </Box>
            <Button variant="contained" component={ Link} state={{ id: ticket?.uuid }} href={`/ticket-management/your-ticket-view/${ticket?.uuid}`} to={`/ticket-management/your-ticket-view/${ticket?.uuid}`} >
               View
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

OpenTicketCard.propTypes = {
  ticket: PropTypes.any
};
export default OpenTicketCard;
