import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography,Chip } from '@mui/material';
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
        Authorization: `Bearer ${localStorage.getItem('token')}`
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
      <Chip   label="Edit Module " sx={{fontSize:'1.4rem', fontWeight:"bold" ,border:2,borderColor:"#0cce7b" ,}}/>

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
          <Box
            sx={{
              mb: 4,
              position: 'relative',
              width: '100%',
              height: 200,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='m10.65 15.75l4.875-3.125q.35-.225.35-.625t-.35-.625L10.65 8.25q-.375-.25-.763-.038t-.387.663v6.25q0 .45.388.663t.762-.038M3.025 13q.425 0 .763.275t.462.7q.15.575.363 1.088t.487 1.012q.225.375.188.8t-.338.725q-.275.275-.675.25t-.625-.35q-.55-.775-.925-1.662T2.15 14q-.075-.4.188-.7t.687-.3M4.95 6.4q.3.3.325.725T5.1 7.9q-.275.5-.487 1.025t-.363 1.1q-.125.425-.462.7T3.025 11t-.687-.312t-.163-.713q.2-.95.575-1.837t.9-1.663q.225-.325.625-.337t.675.262m1.4 12.625q.3-.325.738-.35t.812.2q.5.275 1.013.5t1.062.375q.425.125.7.45t.275.75t-.312.675t-.713.175q-.95-.2-1.788-.575T6.5 20.35q-.35-.225-.387-.625t.237-.7M11 3.05q0 .425-.262.75t-.688.45q-.575.15-1.1.363t-1.025.512q-.375.225-.812.188t-.738-.338t-.262-.712t.387-.638q.8-.5 1.663-.862T9.974 2.2q.4-.075.713.175T11 3.05M20 12q0-2.825-1.737-4.988T13.825 4.2q-.375-.1-.6-.425T13 3.05t.275-.662t.625-.188q3.5.7 5.8 3.425T22 12t-2.3 6.375t-5.8 3.425q-.35.075-.625-.187T13 20.95t.225-.725t.6-.425q2.7-.65 4.438-2.812T20 12'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              border:1,
              borderRadius:'50px',
            }}
          >
            <ReactPlayer
              url={videoUrl}
              controls
              autoPlay
              loop
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
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
