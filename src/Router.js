import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import ClinicSearch from '../src/components/ClinicSearch/ClinicSearch';
import ClinicSearchResults from './components/ClinicSearch/ClinicSearchResults';

// Imported components for user login system
// import SignIn from './Containers/SignIn';
// import SignUp from './components/SignUp';
// import AddressBook from './components/AddressBook';
// import SavedJobs from './components/SavedJobs';

// Auth code to verify user
// const checkAuth = () => {
//   const cookies = cookie.parse(document.cookie);
//   return cookies['loggedIn'] ? true : false;
// };
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         checkAuth() ? <Component {...props} /> : <Redirect to='/login' />
//       }
//     />
//   );
// };


function Router() {
  const [jobSearch, setJobSearch] = useState({});
  const [clinicSearch, setClinicSearch] = useState('');

  return (
    <Switch>
      
      <Route path='/clinic-results'>
      {/* <Redirect path='/clinic-results'/> */}
      <ClinicSearchResults clinicSearch={clinicSearch} />
      </Route>
      

      {/* Components for user login and retrieve info */}
      {/* <Route path='/sign-in' component={SignIn}></Route> */}
      {/* <Route path='/sign-up' component={SignUp}></Route> */}
      {/* <Route path='/address-book' component={AddressBook}></Route> */}
      {/* <Route path='/saved-jobs' component={SavedJobs}></Route> */}

    </Switch>
  );
}

export default Router;
