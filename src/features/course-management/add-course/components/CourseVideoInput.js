// ** React Imports
import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'components/icon';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';

const FileUploaderSingle = () => {
  // ** State
  const [files, setFiles] = useState([]);

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg'] // Allow video formats
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    }
  });

  const renderMedia = () => {
    if (files.length) {
      // Assuming the files are videos
      return files.map((file) => (
        <CardMedia
          key={file.name}
          autoPlay
          controls
          component={'video'}
          sx={{ height: 300, width: '100%' }}
          src={URL.createObjectURL(file)}
        />
      ));
    }

    return (
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          border: 'dashed',
          p: 2,
          borderWidth: 0.5,
          my: 3
        }}
      >
        <Box
          sx={{
            mb: 5.75,
            width: 48,
            height: 48,
            display: 'flex',
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (theme) => theme.palette.primary.main,
            color: '#fff'
          }}
        >
          <Icon icon="tabler:upload" fontSize="1.75rem" />
        </Box>
        <Typography variant="h4" sx={{ mb: 2.5 }}>
          Drop files here or click to upload.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>(This is just a demo drop zone. Selected files are not actually uploaded.)</Typography>
      </Box>
    );
  };

  return (
    <Grid>
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
        <input {...getInputProps()} />
        {renderMedia()}
      </Box>
      <TextField label="Video Link" fullWidth />
      <Button variant="tonal" sx={{ my: 3 }}>
        Save Module
      </Button>
    </Grid>
  );
};

export default FileUploaderSingle;
