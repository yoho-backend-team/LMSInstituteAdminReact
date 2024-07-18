import { Grid, TextField ,InputAdornment,IconButton} from '@mui/material';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/userThunks';
import { setUsers } from '../../redux/userSlices';


const TableHeader = (props) => {
  const { toggle, selectedBranchId,users ,setUserRefetch,userRefetch} = props;
  const [search,setSearch] = useState(false)


  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  const handleSearchValueChange = (e) => {
    const searchInput = e.target.value;
    setSearchValue(searchInput);
  }


  // Callback function to handle search
  const handleSearch = useCallback(
    (value) => {
     
      const data = users?.filter((i)=>(i.first_name.toLowerCase()+i.last_name.toLowerCase()).includes(value))

      if(data){
        setSearch(true)
        dispatch(setUsers({data:data}))
      }
    },
    [dispatch,users]
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
      <Grid item sm={6} xs={12}></Grid>
      <Grid item sm={4} xs={12}>
        <TextField 
        value={searchValue} 
        fullWidth 
        placeholder="Search Admin User" 
        onChange={(e) => handleSearchValueChange(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {
               search ?
               <IconButton onClick={()=>{setUserRefetch(!userRefetch);setSearchValue('');setSearch(false)}} >
                <Icon icon={"material-symbols:close"} />
               </IconButton>
               :
              <IconButton onClick={() => handleSearch(searchValue)}>
               <Icon icon="material-symbols:search" />
              </IconButton>
              }
             
            </InputAdornment>
          )
        }} 
        />
      </Grid>
      <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          Add Admin User
        </Button>
      </Grid>
    </Grid>
  );
};

TableHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};
export default TableHeader;
