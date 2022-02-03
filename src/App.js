import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from './components/Footer';
import FamilyMemberForm from './components/FamilyMemberForm';
import EditFamilyMemberForm from './components/EditFamilyMemberForm';
import FamilyMemberList from './components/FamilyMemberList';
import FamilyTree from './components/FamilyTree';
import PersonPage from './components/PersonPage';
import { peopleRequest } from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);

  const getCurrentListOfPeople = () => {
    peopleRequest
      .getAll()
      .then(initialPeople => {
      setPeople(initialPeople);
      console.log(initialPeople)
    })
  };

  useEffect(() => {
    getCurrentListOfPeople();
  }, []);

  const removePerson = (personId) => {
    peopleRequest
      .deletePerson(personId)
      .then(() => {
        getCurrentListOfPeople();
      });
  };


  // const getPersonPath = (name) => {
  //   if (typeof name !== 'string') return;
  //   return name.trim().replace(/\s+/g, '-').toLowerCase();
  // };

  return (
    <Router>
      <div className='top-nav'>
        <Link to="/">home</Link>
        <Link to="/family-tree">Family Tree</Link>
        <Link to="/family-members">Family Members</Link>
        <Link to="/add-new-family-member">Add New Family Member</Link>
        <Link to="/edit-family-member">Edit Family Member</Link>
      </div>

      <Switch>
        <Route path='/family-members/:name' component={PersonPage} />
        <Route path='/family-members'>
         <FamilyMemberList people={people} removePerson={removePerson} />
        </Route>      
        <Route path='/family-tree'>
          <FamilyTree people={people} />
        </Route>
        <Route path='/add-new-family-member'>
          <div>
            <h2>Add Family Member</h2>
            <FamilyMemberForm getUpdatedListOfPeople={getCurrentListOfPeople} currentListOfPeople={people} />
          </div>
        </Route>
        <Route path='/edit-family-member'>
          <div>
            <h2>Edit Family Member</h2>
            <EditFamilyMemberForm editPerson={true} getUpdatedListOfPeople={getCurrentListOfPeople} currentListOfPeople={people} />
          </div>
        </Route>
      </Switch>

  
       
      <Footer />

    </Router>
    
  );
};

export default App;