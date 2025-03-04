import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import Sidebar from 'components/sidebar';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const UserProfileRight = (props) => {
  const {
    store,
    hidden,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle,
    communityDetails
  } = props;

  const [active, setActive] = useState(null);

  useEffect(() => {
    if (store && store.chats) {
      if (active !== null) {
        if (active.type === 'contact' && active.id === store.chats[0].id) {
          setActive({ type: 'chat', id: active.id });
        }
      }
    }
  }, [store, active]);

  const hasActiveId = (id) => {
    if (store.chats !== null) {
      const arr = store.chats.filter((i) => i.id === id);
      return !!arr.length;
    }
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>;
    }
  };

  const renderStaff = () => {
    if (!communityDetails?.batch_staff) {
      return (
        <ListItem>
          <Typography sx={{ color: 'text.secondary' }}>No Staffs Found</Typography>
        </ListItem>
      );
    } else {
      const arrToMap = communityDetails?.batch_staff;
      return arrToMap !== null
        ? arrToMap?.map((contact, index) => {
            const activeCondition = active !== null && active.id === contact.id && active.type === 'contact' && !hasActiveId(contact.id);
            return (
              <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1 } }}>
                <ListItemButton
                  disableRipple
                  onClick={() => handleChatClick(hasActiveId(contact.id) ? 'chat' : 'contact', contact.id) }
                 
                  sx={{
                    py: 2,
                    px: 3,
                    width: '100%',
                    borderRadius: 1,
                    '&.MuiListItemButton-root:hover': { backgroundColor: 'action.hover' },
                    ...(activeCondition && {
                      background: (theme) =>
                        `linear-gradient(72.47deg, ${theme.palette.primary.main} 22.16%, ${hexToRGBA(
                          theme.palette.primary.main,
                          0.7
                        )} 76.47%) !important`
                    })
                  }}
                > 
              
                  <ListItemAvatar sx={{ m: 0 }}>
                    {contact.staff?.image ? (
                      <MuiAvatar
                        alt={contact.staff?.staff_name}
                        src={contact.avatar}
                        sx={{
                          width: 38,
                          height: 38,
                          outline: (theme) => `2px solid ${activeCondition ? theme.palette.common.white : 'transparent'}`
                        }}
                      />
                    ) : (
                      <CustomAvatar
                        color={contact.avatarColor}
                        skin={activeCondition ? 'light-static' : 'light'}
                        sx={{
                          width: 38,
                          height: 38,
                          fontSize: (theme) => theme.typography.body1.fontSize,
                          outline: (theme) => `2px solid ${activeCondition ? theme.palette.common.white : 'transparent'}`
                        }}
                      >
                        {getInitials(contact.staff?.staff_name)}
                      </CustomAvatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      my: 0,
                      ml: 3,
                      ...(activeCondition && { '& .MuiTypography-root': { color: 'common.white' } })
                    }}
                    primary={<Typography variant="h6">{contact.staff?.staff_name}</Typography>}
                    secondary={
                      <Typography noWrap sx={{ ...(!activeCondition && { color: 'text.secondary' }) }}>
                        {contact.staff?.email}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        : null;
    }
  };

  const renderContacts = () => {
    if (!communityDetails?.batch_student) {
      return (
        <ListItem>
          <Typography sx={{ color: 'text.secondary' }}>No Students Found</Typography>
        </ListItem>
      );
    } else {
      const arrToMap = communityDetails?.batch_student;

      return arrToMap !== null
        ? arrToMap.map((contact, index) => {
            const activeCondition = active !== null && active.id === contact.id && active.type === 'contact' && !hasActiveId(contact.id);

            return (
              <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1 } }}>
                <ListItemButton
                  disableRipple
                  onClick={() => handleChatClick(hasActiveId(contact.id) ? 'chat' : 'contact', contact.id)}
                  sx={{
                    py: 2,
                    px: 3,
                    width: '100%',
                    borderRadius: 1,
                    '&.MuiListItemButton-root:hover': { backgroundColor: 'action.hover' },
                    ...(activeCondition && {
                      background: (theme) =>
                        `linear-gradient(72.47deg, ${theme.palette.primary.main} 22.16%, ${hexToRGBA(
                          theme.palette.primary.main,
                          0.7
                        )} 76.47%) !important`
                    })
                  }}
                >
                  <ListItemAvatar sx={{ m: 0 }}>
                    {contact.student?.image ? (
                      <MuiAvatar
                        alt={contact.student?.first_name}
                        src={contact.avatar}
                        sx={{
                          width: 38,
                          height: 38,
                          outline: (theme) => `2px solid ${activeCondition ? theme.palette.common.white : 'transparent'}`
                        }}
                      />
                    ) : (
                      <CustomAvatar
                        color={contact.avatarColor}
                        skin={activeCondition ? 'light-static' : 'light'}
                        sx={{
                          width: 38,
                          height: 38,
                          fontSize: (theme) => theme.typography.body1.fontSize,
                          outline: (theme) => `2px solid ${activeCondition ? theme.palette.common.white : 'transparent'}`
                        }}
                      >
                        {getInitials(contact?.student?.first_name)}
                      </CustomAvatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      my: 0,
                      ml: 3,
                      ...(activeCondition && { '& .MuiTypography-root': { color: 'common.white' } })
                    }}
                    primary={<Typography variant="h6">{contact.student?.first_name}</Typography>}
                    secondary={
                      <Typography noWrap sx={{ ...(!activeCondition && { color: 'text.secondary' }) }}>
                        {contact.student?.email}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        : null;
    }
  };

  return (
    <Sidebar
      direction="right"
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: '100%',
        width: sidebarWidth,
        backgroundColor: "#3A4042",
        borderTopRightRadius: (theme) => theme.shape.borderRadius,
        borderBottomRightRadius: (theme) => theme.shape.borderRadius,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        }
      }}
    >
      {store && store.selectedChat ? (
        <Fragment>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              size="small"
              onClick={handleUserProfileRightSidebarToggle}
              sx={{ top: '0.5rem', right: '0.5rem', position: 'absolute', color: 'text.disabled' }}
            >
              <Icon icon="tabler:x" />
            </IconButton>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: (theme) => theme.spacing(7, 6, 2) }}>
              <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'center' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={
                    <Box
                      component="span"
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        color: `${statusObj[store.selectedChat.contact.status]}.main`,
                        boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                        backgroundColor: `${statusObj[store.selectedChat.contact.status]}.main`
                      }}
                    />
                  }
                >
                  {store.selectedChat.contact.avatar ? (
                    <MuiAvatar
                      sx={{ width: '5rem', height: '5rem' }}
                      src={communityDetails?.batch?.batch_name}
                      alt={communityDetails?.batch?.batch_name}
                    />
                  ) : (
                    <CustomAvatar
                      skin="light"
                      color={communityDetails?.batch?.batch_name}
                      sx={{ width: '5rem', height: '5rem', fontWeight: 500, fontSize: '2rem' }}
                    >
                      {getInitials(communityDetails?.batch?.batch_name)}
                    </CustomAvatar>
                  )}
                </Badge>  
              </Box>
              <Typography variant="h4" sx={{ textAlign: 'center' ,color: 'common.white'}}>
                {communityDetails?.batch?.batch_name}
              </Typography>
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 0.5 }}>
                {communityDetails?.batch?.institute_course_branch?.course_name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: 'calc(100% - 13.3125rem)' }}>
            <ScrollWrapper>
              <Box sx={{ p: 3 }}>
                <FormGroup sx={{ mb: 6.5 }}>
                  <Typography variant="body2" sx={{ mb: 3.5,color: 'primary.main', textTransform: 'uppercase', lineHeight: 'normal' }}>
                    About
                  </Typography>
                  <Typography sx={{color: 'common.white' }}>{store.selectedChat.contact.about}</Typography>
                </FormGroup>

                <Box sx={{ mb: 6 }}>
                  <Typography variant="body2" sx={{ mb: 3.5, color: 'primary.main', textTransform: 'uppercase', lineHeight: 'normal' }}>
                    Personal Information
                  </Typography>
                  <List dense sx={{ p: 0 }}>
                    <ListItem sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2,color: 'common.white' }}>
                        <Icon icon="tabler:mail" fontSize="1.5rem" />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ textTransform: 'lowercase',color: 'common.white' }}
                        primaryTypographyProps={{ variant: 'body1' }}
                        primary={`${store.selectedChat.contact.fullName.replace(/\s/g, '_')}@email.com`}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 2 ,}}>
                      <ListItemIcon sx={{ mr: 2,color: 'common.white'  }}>
                        <Icon icon="tabler:phone-call" fontSize="1.5rem" />
                      </ListItemIcon>
                      <ListItemText sx={{color: 'common.white' }} primaryTypographyProps={{ variant: 'body1' }} primary="+1(123) 456 - 7890" />
                    </ListItem>
                    <ListItem sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2,color: 'common.white'  }}>
                        <Icon icon="tabler:clock" fontSize="1.5rem" />
                      </ListItemIcon>
                      <ListItemText sx={{color: 'common.white' }} primaryTypographyProps={{ variant: 'body1' }} primary="Mon - Fri 10AM - 8PM" />
                    </ListItem>
                  </List>
                </Box>

                <Box>
                  <Box>
                    <Typography variant="h5" sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
                      Staff
                    </Typography>
                    <List sx={{ mb: 5, p: 0,color:'common.white' }}>{renderStaff()}</List>
                    <Typography variant="h4" sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
                      Students
                    </Typography>
                    <List sx={{ p: 0,color:'common.white' }}>{renderContacts()}</List>
                  </Box>
                </Box>
              </Box>
            </ScrollWrapper>
          </Box>
        </Fragment>
      ) : null}
    </Sidebar>
  );
};

UserProfileRight.propTypes = {
  store: PropTypes.any,
  hidden: PropTypes.any,
  statusObj: PropTypes.any,
  getInitials: PropTypes.any,
  sidebarWidth: PropTypes.any,
  userProfileRightOpen: PropTypes.any,
  handleUserProfileRightSidebarToggle: PropTypes.any,
  communityDetails: PropTypes.any
};

export default UserProfileRight;
