import React, { useState, useEffect } from 'react';
import Person from './components/Person';
import Notification from './components/Notification';
import Footer from './components/Footer';
import peopleRequest from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonBio, setNewPersonBio] = useState('');
  const [newPersonPartner, setNewPersonPartner] = useState('');
  const [newPersonParents, setNewPersonParents] = useState([]);
  const [newPersonChildren, setNewPersonChildren] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleRequest
      .getAll()
      .then(initialPeople => {
      setPeople(initialPeople)
    })
  }, []);

  const resetNewPersonFields = () => {
    setNewPersonName('');
    setNewPersonBio('');
    setNewPersonPartner('');
    setNewPersonParents([]);
    setNewPersonChildren([]);
  };

  // const newPersonParents = () => {
  //   const parentsArray = [];

  //   if (newPersonParent1) parentsArray.push(newPersonParent1);
  //   if (newPersonParent2) parentsArray.push(newPersonParent2);

  //   return parentsArray.length > 0 ? parentsArray : null;
  // };

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: newPersonName,
      bio: newPersonBio,
      parents: newPersonParents, // via dropdown list of names of people already added to DB
      children: newPersonChildren,// via dropdown list of names of people already added to DBc
      partner: newPersonPartner
    }

    peopleRequest
      .create(personObject)
        .then(returnedPerson => {
        setPeople(people.concat(returnedPerson));
        resetNewPersonFields();
      })
  }

  // const toggleImportanceOf = id => {
  //   const person = people.find(n => n.id === id)
  //   const changedPerson = { ...person, important: !person.important }
  
  //   peopleRequest
  //   .update(id, changedPerson)
  //     .then(returnedPerson => {
  //     setPeople(people.map(person => person.id !== id ? person : returnedPerson));
  //   })
  //   .catch(error => {
  //     setErrorMessage(
  //       `Person '${person.name}' was already removed from server`
  //     )
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000)
  //   });    
  // };

  const handlePersonNameChange = (event) => {
    console.log(event.target.value);
    setNewPersonName(event.target.value);
  };

  const handlePersonBioChange = (event) => {
    console.log(event.target.value);
    setNewPersonBio(event.target.value);
  };


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
      <form onSubmit={addPerson}>
        <label>
          Full Name:
          <input
            value={newPersonName}
            onChange={handlePersonNameChange}
          />
        </label>
        <label>
          <div>Bio:</div>
          <textarea
            value={newPersonBio}
            onChange={handlePersonBioChange}
          />
         </label>
        <button type="submit">save</button>
      </form>  
      <Footer />
    </div>
  );
};

export default App;