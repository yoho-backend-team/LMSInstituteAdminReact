// // @mui
// import { Container, Box } from '@mui/material';
// // routes
// // import { PATH_DASHBOARD } from '../../routes/paths';
// // hooks
// // import useSettings from '../../hooks/useSettings';
// // _mock_
// import { _userCards } from '../../../../_mock'
// // components
// // import Page from '../../components/Page';
// // import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// // sections
// import { UserCard } from '../../sections/@dashboard/user/cards';

// // ----------------------------------------------------------------------

// UserCard.propTypes = {
//     user: PropTypes.object.isRequired,
//   };

// export default function UserCards() {
//   const { themeStretch } = useSettings();

//   return (
//     <Page title="User: Cards">
//       <Container maxWidth={themeStretch ? false : 'lg'}>
//         <HeaderBreadcrumbs
//           heading="User Cards"
//           links={[
//             { name: 'Dashboard' },
//             { name: 'User'},
//             { name: 'Cards'},
//           ]}
//         />

//         <Box
//           sx={{
//             display: 'grid',
//             gap: 3,
//             gridTemplateColumns: {
//               xs: 'repeat(1, 1fr)',
//               sm: 'repeat(2, 1fr)',
//               md: 'repeat(3, 1fr)',
//             },
//           }}
//         >
//           {_userCards.map((user) => (
//             <UserCard key={user.id} user={user} />
//           ))}
//         </Box>
//       </Container>
//     </Page>
//   );
// }
