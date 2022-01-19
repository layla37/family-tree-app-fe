import { useState, useEffect } from 'react';
import { peopleRequest } from './../services/people';

const PARENT_NOT_IN_DB = 'parent not listed';

const FamilyMemberForm = ({
  getUpdatedListOfPeople,
  currentListOfPeople
  }) => {
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonBio, setNewPersonBio] = useState('');
  const [newPersonParent1, setNewPersonParent1] = useState('');
  const [newPersonParent2, setNewPersonParent2] = useState('');
  const [newPersonPartners, setNewPersonPartners] = useState([]);
  const [newPersonChildren, setNewPersonChildren] = useState([]);

  const resetNewPersonFields = () => {
    setNewPersonName('');
    setNewPersonBio('');
    setNewPersonPartners([]);
    setNewPersonChildren([]);
  };

  const getParentsArray = () => {
    const parentsArray = [];

    if (newPersonParent1 && newPersonParent1 !== PARENT_NOT_IN_DB) parentsArray.push(newPersonParent1);
    if (newPersonParent2 && newPersonParent2 !== PARENT_NOT_IN_DB) parentsArray.push(newPersonParent2);

    return parentsArray;
  }

  const getPersonUrl = (name) => {
    if (!newPersonName) return;
    return newPersonName.trim().toLowerCase().replaceAll(' ', '-');
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: newPersonName,
      bio: newPersonBio,
      parents: getParentsArray(), // via dropdown list of names of people already added to DB
      children: newPersonChildren, // via dropdown list of names of people already added to DBc
      partners: newPersonPartners,
      url: getPersonUrl(newPersonName)
    }

    peopleRequest
      .create(personObject)
        .then(returnedPerson => {
          getUpdatedListOfPeople();
          resetNewPersonFields();
      });
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
            <option value={PARENT_NOT_IN_DB}>{PARENT_NOT_IN_DB}</option>
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
