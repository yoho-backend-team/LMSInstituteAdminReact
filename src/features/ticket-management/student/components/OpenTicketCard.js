import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Avatar, Box, Card, CardContent, Grid, Icon, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';

const OpenTicketCard = ({ ticket, onClick, handleSelectedTicket }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ minHeight: 240 }}>
        <CardContent>
          <Box sx={{ }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={''} sx={{ mr: 2.5, height: 38, width: 38 }} />
              <Box>
                <Typography variant="h5">
                  {ticket?.student?.first_name} {ticket?.student?.last_name}
                </Typography>
                <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                  {ticket?.student?.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.75 }}>
              <Typography sx={{ fontSize: 12, color: 'primary.main' }}>{ticket?.ago}</Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              my: 4,
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            }}
          >
            {ticket?.query}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomChip
                icon={<CrisisAlertIcon />}
                rounded
                size="small"
                skin="light"
                color={'error'}
                label={`Priority:${ticket?.priority}`}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" sx={{ color: 'text.disabled' }}>
                <Icon fontSize="1.25rem" icon="tabler:star" />
              </IconButton>
              <OptionsMenu
                iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                options={[
                  {
                    text: 'Resolve',
                    icon: <Icon icon="tabler:edit" />,
                    menuItemProps: {
                      onClick: () => {
                        onClick();
                        handleSelectedTicket(ticket);
                      }
                    }
                  }
                ]}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

OpenTicketCard.propTypes = {
  ticket: PropTypes.any,
  onClick: PropTypes.any,
  handleSelectedTicket: PropTypes.any
};
export default OpenTicketCard;
