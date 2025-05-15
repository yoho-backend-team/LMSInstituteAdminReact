import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';

const RefundDetailsCard = ({ selectedRowDetails, history1 }) => {
  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        ':hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {selectedRowDetails && (
          <Box sx={{ width: '100%' }}>
            {/* Header with Avatar and Status */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRowDetails?.students?.image}`}
                  sx={{ 
                    mr: 2.5, 
                    height: 48, 
                    width: 48,
                    boxShadow: '0 2px 8px 0 rgb(32 40 45 / 12%)'
                  }}
                />
                <Box>
                  <Typography variant="h4" color="primary.main">
                    Refund ID
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {selectedRowDetails.fee_id}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: 'primary.lighter',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'primary.main' }}>
                  {selectedRowDetails.status}
                </Typography>
              </Box>
            </Box>

            {/* Student Details Section */}
            <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
              Student Details
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Student ID', value: history1?.transaction_id },
                { label: 'Student Name', value: selectedRowDetails?.student?.full_name },
                { label: 'Student Email', value: selectedRowDetails?.student?.email },
                { label: 'Paid Amount', value: history1?.paid_amount },
                { label: 'Payment Date', value: history1?.payment_date }
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    p: 1.5,
                    bgcolor: index % 2 === 0 ? 'grey.50' : 'transparent',
                    borderRadius: 1
                  }}
                >
                  <Typography sx={{ width: 150, fontWeight: 500 }}>
                    {item.label}:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', flex: 1 }}>
                    {item.value || '-'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

RefundDetailsCard.propTypes = {
  selectedRowDetails: PropTypes.object,
  history1: PropTypes.object
};

export default RefundDetailsCard;