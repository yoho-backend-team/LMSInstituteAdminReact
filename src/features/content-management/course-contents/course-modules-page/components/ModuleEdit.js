import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player';
import * as yup from 'yup';
import { updateCourseModule } from '../services/moduleServices';
import secureLocalStorage from 'react-secure-storage';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  description: yup.string().required('Description is required'),
  title: yup
    .string()
    .required('Title is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Title should not contain special characters'),
  video_url: yup
    .string()
    .required('Video URL is required')
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|playlist\?list=)|youtu\.be\/|vimeo\.com\/|dai\.ly\/|dailymotion\.com\/video\/|twitch\.tv\/|bitchute\.com\/)/,
      'Invalid video URL'
    )
});

const defaultValues = {
  description: '',
  title: '',
  Videourl: ''
};

const ModuleEdit = (props) => {
  const { open, toggle, modules, setRefetch } = props;

  const [groups, setGroups] = useState([]);

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (modules) {
      setVideoUrl(modules.video_url);
    }
  }, [modules]);

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/course/get-all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ** Hooks
  const {
    reset,
    control,
    setValue,
    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: props.initialValues || defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (modules) {
      setValue('title', modules?.title || '');
      setValue('description', modules?.description || '');
      setValue('video_url', modules?.video_url || '');
    }
  }, [modules, setValue]);

  const onSubmit = async (data) => {
    const updateData = {
      title: data.title,
      description: data.description,
      video: data.video_url,
      uuid: modules.uuid
    };

    const result = await updateCourseModule(updateData);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state); // Trigger category refetch
      toggle();
    } else {
      let errorMessage = '';

      toast.error(errorMessage.trim());
    }
  };
  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 400, sm: 480 } } }}
    >
      <Header sx={{ pb: 2 }}>
        <Typography variant="h5">Edit Module</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
            }
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(3, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <ReactPlayer
              style={{ objectFit: 'cover', width: '100%', backgroundColor: 'black' }}
              url={videoUrl}
              controls
              autoPlay
              loop
              width="100%"
              height={200}
            />
          </Box>

          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Title"
                onChange={onChange}
                placeholder="John Doe"
                error={Boolean(errors.title)}
                {...(errors.title && { helperText: errors.title.message })}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="description"
                onChange={onChange}
                placeholder="Business Development Executive"
                error={Boolean(errors.description)}
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />

          <Controller
            name="video_url"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Video URL"
                onChange={onChange}
                placeholder="e.g., https://www.youtube.com/watch?v=example"
                error={Boolean(errors.video_url)}
                helperText={errors.video_url ? errors.video_url.message : ''}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

ModuleEdit.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  modules: PropTypes.any,
  setRefetch: PropTypes.any
};

export default ModuleEdit;