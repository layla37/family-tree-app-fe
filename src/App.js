import React, { useState, useEffect } from 'react';
import Person from './components/Person';
import Notification from './components/Notification';
import Footer from './components/Footer';
import FamilyMemberForm from './components/FamilyMemberForm';
import peopleRequest from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  // const [newPersonName, setNewPersonName] = useState('');
  // const [newPersonBio, setNewPersonBio] = useState('');
  // const [newPersonPartner, setNewPersonPartner] = useState('');
  // const [newPersonParents, setNewPersonParents] = useState([]);
  // const [newPersonChildren, setNewPersonChildren] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleRequest
      .getAll()
      .then(initialPeople => {
      setPeople(initialPeople);
      console.log('hi hi hi new person added to list!')
    })
  }, []);

  return (
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
      <h2>Add Family Member</h2>
        <FamilyMemberForm addPersonToList={setPeople} currentListOfPeople={people} />
      <Footer />
    </div>
  );
};

export default App;