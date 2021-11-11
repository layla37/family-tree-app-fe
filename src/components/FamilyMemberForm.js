import React, { useState, useEffect } from 'react';
import peopleRequest from '../services/people';

const FamilyMemberForm = ({
  addPersonToList,
  currentListOfPeople
  }) => {
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonBio, setNewPersonBio] = useState('');
  const [newPersonPartner, setNewPersonPartner] = useState('');
  const [newPersonParents, setNewPersonParents] = useState([]);
  const [newPersonChildren, setNewPersonChildren] = useState([]);

  const resetNewPersonFields = () => {
    setNewPersonName('');
    setNewPersonBio('');
    setNewPersonPartner('');
    setNewPersonParents([]);
    setNewPersonChildren([]);
  };

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: newPersonName,
      bio: newPersonBio,
      parents: newPersonParents, // via dropdown list of names of people already added to DB
      children: newPersonChildren, // via dropdown list of names of people already added to DBc
      partner: newPersonPartner
    }

    peopleRequest
      .create(personObject)
        .then(returnedPerson => {
          addPersonToList(currentListOfPeople.concat(returnedPerson));
          resetNewPersonFields();
      })
  };

  const handlePersonNameChange = (event) => {
    console.log(event.target.value);
    setNewPersonName(event.target.value);
  };

  const handlePersonBioChange = (event) => {
    console.log(event.target.value);
    setNewPersonBio(event.target.value);
  };

  return (
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
  );
};

export default FamilyMemberForm;
