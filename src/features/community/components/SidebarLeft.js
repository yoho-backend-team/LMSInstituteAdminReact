import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import CustomTextField from 'components/mui/text-field';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { hexToRGBA } from 'utils/hex-to-rgba';
import { getAllBatchChats, getAllMessages } from '../services/communityServices';
import { useSpinner } from 'context/spinnerContext';
import { getUserDetails } from 'utils/check-auth-state';
import { getImageUrl } from 'utils/imageUtils';

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>;
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>;
  }
};



const SidebarLeft = (props) => {
  const {
    store,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    userStatus,
    getInitials,
    sidebarWidth,
    leftSidebarOpen,
    removeSelectedChat,
    handleLeftSidebarToggle,
    handleUserProfileLeftSidebarToggle,
    communities,
    setChats,
    setSelectedBatch,
    chats,
    socket,
    setCommunityDetails,
    setMessages,
    messages
  } = props;

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);
  const [getchatsState,setChatsState] = useState(false)
  const { show, hide } = useSpinner()
  const user = getUserDetails()
  console.log(user,"user")
  const handleChatClick = async (type, community) => {
    setChats(null);
    setActive(community);
    setSelectedBatch(community);
    const communityId = community?._id
    setCommunityDetails(community)
    const user = getUserDetails()
    

    socket.emit("joinGroup",{groupId:communityId,userId:user?._id},(error)=>{

    })
    const response = await getAllMessages({ community : community?._id})
    setMessages(response)
    if (community && community._id) {
      try {
        show()
        const response = await getAllBatchChats({ chatId: community._id });
        
        if (response) {
          setChatsState(true)
          setChats(response.data);
        }
      } catch (error) {
        hide()
        console.error('Error in handleChatClick:', error);
      }finally{
        hide()
      }
    } else {
      console.error('Error: Missing community ID');
    }
  
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };
  
  useEffect(() => {
    dispatch(removeSelectedChat());
    return () => {
      dispatch(removeSelectedChat());
    };
  }, []);

  const hasActiveId = (id) => {
    if (communities !== null) {
      const arr = communities.filter((i) => i.uuid === id);

      return !!arr.length;
    }
  };

  const renderContacts = () => {
    if (communities === undefined) {
      return (
        <ListItem>
          <Typography sx={{ color: 'text.secondary' }}>No Batches Found</Typography>
        </ListItem>
      );
    } else {
      const arrToMap = communities;

      return arrToMap !== null
        ? arrToMap?.map((contact, index) => {
            const activeCondition = active !== null && active._id === contact._id;

            return (
              <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': {  } }}>
                <ListItemButton
                  disableRipple
                  onClick={() => handleChatClick(hasActiveId(contact._id) ? 'chat' : 'contact', contact)}
                  sx={{
                    py: 2,
                    px: 3,
                    width: '100%',
                    borderRadius: 1,
                    borderBottom: "1px solid #8696a026",
                    '&.MuiListItemButton-root:hover': { backgroundColor: 'action.hover' },
                    transition: 'background-color 0.3s ease',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
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
                    {contact.avatar ? (
                      <MuiAvatar
                        alt={contact.fullName}
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
                        {getInitials(contact?.group)}
                      </CustomAvatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      my: 0,
                      ml: 3,
                      ...(activeCondition && { '& .MuiTypography-root': { color: "white" } })
                    }}
                    primary={<Typography sx={{ fontSize: "1.1em", fontWeight: 600,color: "white"}} variant="h4">{contact?.group}</Typography>}
                    secondary={
                      <Typography noWrap sx={{ ...(!activeCondition && { color: "white" }), fontSize: "0.9em", mt: 0.5, color: "#aaa" }}>
                        {contact?.batch?.course?.course_name}
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

  const handleFilter = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true
        }}
        sx={{
          zIndex: 7,
          height: '100%',
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            // boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
            width: sidebarWidth,
            borderRight: "1px solid rgba(0, 0, 0, 0.2)",
            position: mdAbove ? 'static' : 'absolute',
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius
          },
          '& > .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.drawer - 1
          }
        }}
      >
        <Box
          sx={{
            pt: "12px",
            pb:"20px",
            minHeight: "70px",
            px: 3,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "#111B21",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`
          }}
        >
          {user && user?.image  ? (
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              sx={{ mr: 3, display: "none" }}
              onClick={handleUserProfileLeftSidebarToggle}
              badgeContent={
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    color: `${statusObj[userStatus]}.main`,
                    backgroundColor: `${statusObj[userStatus]}.main`,
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`
                  }}
                />
              }
            >
              <MuiAvatar
                src={getImageUrl(user?.image)}
                alt={user?.full_name}
                sx={{ width: '2.375rem', height: '2.375rem', cursor: 'pointer' }}
              />
            </Badge>
          ) : null}
          <CustomTextField
            fullWidth
            value={query}
            onChange={handleFilter}
            placeholder="Search for contact..."
            sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' }, display: "none" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                  <Icon fontSize="1.25rem" icon="tabler:search" />
                </InputAdornment>
              )
            }}
          />
          <Typography variant="h4" sx={{  color: 'primary.main',textAlign: "start" }}>
                Batches
          </Typography>
          {!mdAbove ? (
            <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
              <Icon icon="tabler:x" />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ height: `calc(100% - 4.0625rem)`, overflow: ' hidden', backgroundColor: "#111B21" }}>
          <ScrollWrapper hidden={hidden}>
            <Box>
              <List sx={{ p: 0 }}>{renderContacts()}</List>
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>
    </div>
  );
};

SidebarLeft.propTypes = {
  store: PropTypes.any,
  hidden: PropTypes.any,
  mdAbove: PropTypes.any,
  dispatch: PropTypes.any,
  statusObj: PropTypes.any,
  userStatus: PropTypes.any,
  getInitials: PropTypes.any,
  sidebarWidth: PropTypes.any,
  leftSidebarOpen: PropTypes.any,
  removeSelectedChat: PropTypes.any,
  handleLeftSidebarToggle: PropTypes.any,
  handleUserProfileLeftSidebarToggle: PropTypes.any,
  communities: PropTypes.any,
  setChats: PropTypes.any,
  setSelectedBatch: PropTypes.any
};

export default SidebarLeft;
