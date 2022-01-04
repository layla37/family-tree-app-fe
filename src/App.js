import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Person from './components/Person';
import Notification from './components/Notification';
import Footer from './components/Footer';
import FamilyMemberForm from './components/FamilyMemberForm';
import { FamilyTree } from './components/FamilyTree';
import peopleRequest from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleRequest
      .getAll()
      .then(initialPeople => {
      setPeople(initialPeople);
    })
  }, []);

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
        <Route path='/family-members'>
          <div>
            <h1>Family Members</h1>
            <Notification message={errorMessage} />  
            <ul>
              {people.map(person => 
                  <Person
                    key={person.id}
                    person={person}
                  />
              )}
            </ul>
          </div>
        </Route>
        <Route path='/family-tree'>
          <FamilyTree />
        </Route>
        <Route path='/add-new-family-member'>
          <div>
            <h2>Add Family Member</h2>
            <FamilyMemberForm addPersonToList={setPeople} currentListOfPeople={people} />
          </div>
        </Route>
      </Switch>

  
       
      <Footer />

    </Router>
    
  );
};

export default App;