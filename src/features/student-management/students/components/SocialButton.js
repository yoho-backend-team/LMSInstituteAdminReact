import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Iconify from '../../../../components/icon';

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object
};

export default function SocialsButton({ item, initialColor = false, simple = true, links = {}, sx, ...other }) {
  const SOCIALS = [
    {
      name: 'Call Now',
      icon: 'eva:phone-fill',
      socialColor: '#1877F2',
      path: links.instagram || ''
    },
    {
      name: 'Send Email',
      icon: 'eva:email-fill',
      socialColor: '#E02D69',
      path: links.instagram || ''
    },

    {
      name: 'Active',
      icon: 'eva:person-done-fill',
      socialColor: '#65B741',
      path: links.twitter || ''
    },
    {
      name: 'View Profile',
      icon: 'eva:navigation-2-fill',
      socialColor: '#007EBB',
      path: `${item.student.id.toString()}`
    }
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <Link key={name} to={path} state={{ id: item.student.id }}>
            <Tooltip title={name} placement="top">
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    '&:hover': {
                      bgcolor: alpha(socialColor, 0.08)
                    }
                  }),
                  ...sx
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08)
                }
              }),
              ...sx
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
