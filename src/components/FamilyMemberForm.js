import { useState, useEffect } from 'react';
import { peopleRequest } from './../services/people';

const NOT_LISTED = 'person not listed';

const FamilyMemberForm = ({
  getUpdatedListOfPeople,
  currentListOfPeople
  }) => {
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonBio, setNewPersonBio] = useState('');
  const [newPersonParent1, setNewPersonParent1] = useState('');
  const [newPersonParent2, setNewPersonParent2] = useState('');
  const [newPersonPartner1, setNewPersonPartner1] = useState('');
  const [newPersonChildren, setNewPersonChildren] = useState([]);

  const resetNewPersonFields = () => {
    setNewPersonName('');
    setNewPersonBio('');
    setNewPersonPartner1('');
    setNewPersonParent1('');
    setNewPersonParent2('');
    setNewPersonChildren([]);
  };

  const getParentsArray = () => {
    const parentsArray = [];

    if (newPersonParent1 && newPersonParent1 !== NOT_LISTED) parentsArray.push(newPersonParent1);
    if (newPersonParent2 && newPersonParent2 !== NOT_LISTED) parentsArray.push(newPersonParent2);

    return parentsArray;
  }

  const getPartnersArray = () => {
    const partnersArray = [];

    if (setNewPersonPartner1 && setNewPersonPartner1 !== NOT_LISTED) partnersArray.push(setNewPersonPartner1);

    return partnersArray;
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
      partners: getPartnersArray(),
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
            <option value={NOT_LISTED}>{NOT_LISTED}</option>
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
        <label htmlFor='selectPartner'>
          choose partner:
          <select value={newPersonPartner1} onChange={(e) => setNewPersonPartner1(e.target.value)}>
            <option />
            {currentListOfPeople.map((person => {
              return <option key={`partner1-list-${person.id}`} value={person.id}>{person.name}</option>
            }))}
            <option value={NOT_LISTED}>{NOT_LISTED}</option>
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
