import React, { useState, useEffect } from 'react';
import peopleRequest from '../services/people';

const FamilyMemberForm = ({
  addPersonToList,
  currentListOfPeople
  }) => {
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonBio, setNewPersonBio] = useState('');
  const [newPersonParent1, setNewPersonParent1] = useState('');
  const [newPersonParent2, setNewPersonParent2] = useState('');
  const [newPersonPartner, setNewPersonPartner] = useState('');
  const [newPersonChildren, setNewPersonChildren] = useState([]);

  const resetNewPersonFields = () => {
    setNewPersonName('');
    setNewPersonBio('');
    setNewPersonPartner('');
    setNewPersonChildren([]);
  };

  const getParentsArray = () => {
    const parentsArray = [];

    if (newPersonParent1) parentsArray.push(newPersonParent1);
    if (newPersonParent2) parentsArray.push(newPersonParent2);

    if (parentsArray.length === 0) {
       return null;
    }

    return parentsArray;
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: newPersonName,
      bio: newPersonBio,
      parents: getParentsArray(), // via dropdown list of names of people already added to DB
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
    setNewPersonName(event.target.value);
  };

  const handlePersonBioChange = (event) => {
    setNewPersonBio(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
        <label htmlFor='fullNameInput'>
          Full Name:
          <input
            id='fullNameInput'
            value={newPersonName}
            onChange={handlePersonNameChange}
          />
        </label>
        <label htmlFor='selectParent1'>
          choose parent 1:
          <select value={newPersonParent1} onChange={(e) => setNewPersonParent1(e.target.value)}>
            <option />
            {currentListOfPeople.map((person => {
              return <option key={`parent1-list-${person.id}`} value={person.id}>{person.name}</option>
            }))}
            <option value='parent not listed'>parent not listed</option>
          </select>
        </label>
        <label htmlFor='selectParent2'>
          choose parent 2:
          <select value={newPersonParent2} onChange={(e) => setNewPersonParent2(e.target.value)}>
            <option />
            {currentListOfPeople.map((person => {
              return <option key={`parent2-list-${person.id}`} value={person.id}>{person.name}</option>
            }))}
            <option value='parent not listed'>parent not listed</option>
          </select>
        </label>
        <label htmlFor='bioInput'>
          <div>Bio:</div>
          <textarea
            id='bioInput'
            value={newPersonBio}
            onChange={handlePersonBioChange}
          />
         </label>
        <button type="submit">save</button>
      </form>  
  );
};

export default FamilyMemberForm;
