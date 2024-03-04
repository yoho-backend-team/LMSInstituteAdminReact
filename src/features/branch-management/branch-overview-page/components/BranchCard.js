import { Card, CardContent, Grid, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Icon from 'components/icon';
import DeleteDialog from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BranchCard = ({ branch, setEditModalOpen, setSelectedBranch }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  console.log(deletingItemId);

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ position: 'relative' }}>
          <Grid
            sx={{
              position: 'absolute',
              top: 5,
              right: 3
            }}
          >
            <OptionsMenu
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
              options={[
                {
                  text: 'View',
                  icon: <Icon icon="tabler:eye" fontSize={20} />,
                  menuItemProps: {
                    component: Link,
                    to: `${branch?.branch_id}`
                  }
                },
                {
                  text: 'Edit',

                  icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
                  menuItemProps: {
                    onClick: () => {
                      if (branch) {
                        setSelectedBranch(branch);
                        setEditModalOpen(true);
                      }
                    }
                  }
                },
                {
                  text: 'Delete',
                  icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
                  menuItemProps: {
                    onClick: () => handleDelete()
                  }
                }
              ]}
            />
          </Grid>
          <CardMedia
            sx={{
              height: 100,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
              mx: 'auto'
            }}
            image={require('assets/images/avatar/map-pin.png')}
          />
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
              }}
            >
              {branch?.branch_name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
              }}
            >
              {branch?.address}, {branch?.city}, {branch?.state}, {branch?.pin_code}
            </Typography>
          </CardContent>
        </Card>
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
        />
      </Grid>
    </>
  );
};

export default BranchCard;
