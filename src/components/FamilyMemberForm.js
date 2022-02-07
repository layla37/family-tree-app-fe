import { useState, useEffect, useRef } from 'react';
import { peopleRequest } from './../services/people';

const NOT_LISTED = 'person not listed';

const FamilyMemberForm = ({
  getUpdatedListOfPeople,
  currentListOfPeople,
  editPerson = false
  }) => {
  const [personToUpdate, setPersonToUpdate] = useState('');
  const [personName, setPersonName] = useState('');
  const [personBio, setPersonBio] = useState('');
  const [personParent1, setPersonParent1] = useState('');
  const [personParent2, setPersonParent2] = useState('');
  const [personPartner1, setPersonPartner1] = useState('');
  const [personChildren, setPersonChildren] = useState([]);

  const previousEditPersonRef = useRef(editPerson);

  const resetPersonFields = () => {
    setPersonName('');
    setPersonBio('');
    setPersonPartner1('');
    setPersonParent1('');
    setPersonParent2('');
    setPersonChildren([]);
  };

  useEffect(() => {
    if (previousEditPersonRef.current !== editPerson) {
      resetPersonFields();
      previousEditPersonRef.current = editPerson;
    }
  }, [editPerson]);

  useEffect(() => {
    if (personToUpdate) {
      // pre-populate all fields with info from DB
      const person = currentListOfPeople.find((person) => {
        return person.id === personToUpdate;
      });

      if (!person){
        console.log('person not found in DB');
        return;
      } 
      if (person.name) setPersonName(person.name);
      if (person.bio) setPersonBio(person.bio);
      if (person.partners && person.partners[0]) setPersonPartner1(person.partners[0]);
      if (person.children && person.children.length > 0) setPersonChildren(person.children);
      if (person.parents && person.parents[0]) setPersonParent1(person.parents[0]);
      if (person.parents && person.parents[1]) setPersonParent2(person.parents[1]);
    }
  }, [personToUpdate, currentListOfPeople]);

  
  const getParentsArray = () => {
    const parentsArray = [];

    if (personParent1 && personParent1 !== NOT_LISTED) parentsArray.push(personParent1);
    if (personParent2 && personParent2 !== NOT_LISTED) parentsArray.push(personParent2);

    return parentsArray;
  }

  const getPartnersArray = () => {
    const partnersArray = [];
    if (personPartner1 && personPartner1 !== NOT_LISTED) partnersArray.push(personPartner1);
    return partnersArray;
  }

  const getPersonUrl = (name) => {
    if (!personName) return;
    return personName.trim().toLowerCase().replaceAll(' ', '-');
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: personName,
      bio: personBio,
      parents: getParentsArray(),
      children: personChildren,
      partners: getPartnersArray(),
      url: getPersonUrl(personName)
    }

    peopleRequest
      .create(personObject)
        .then(returnedPerson => {
          getUpdatedListOfPeople();
          resetPersonFields();
      });
  };

  const updatePerson = (event, id) => {
    event.preventDefault();

    const personObject = {
      name: personName,
      bio: personBio,
      parents: getParentsArray(),
      children: personChildren,
      partners: getPartnersArray(),
      url: getPersonUrl(personName)
    }

    peopleRequest
      .update(id, personObject)
        .then(returnedPerson => {
          getUpdatedListOfPeople();
          resetPersonFields();
      });
  };

  const handlePersonNameChange = (event) => {
    setPersonName(event.target.value);
  };

  const handlePersonBioChange = (event) => {
    setPersonBio(event.target.value);
  };

  return (
    <form onSubmit={editPerson ? (e) => updatePerson(e, personToUpdate) : addPerson}>
      {editPerson && (
        <label htmlFor='selectPersonToEdit'>
          Choose person to edit:
          <select id='selectPersonToEdit' value={personToUpdate} onChange={(e) => setPersonToUpdate(e.target.value)}>
            <option />
            {currentListOfPeople.map((person => {
              return <option key={`person-to-update-list-${person.id}`} value={person.id}>{person.name}</option>
            }))}
          </select>
        </label>

      )}
      <label htmlFor='fullNameInput'>
        Full Name:
        <input
          id={editPerson ? 'edit-fullNameInput' : 'fullNameInput'}
          value={personName}
          onChange={handlePersonNameChange}
        />
      </label>
      <label htmlFor='selectParent1'>
        choose parent 1:
        <select value={personParent1} onChange={(e) => setPersonParent1(e.target.value)}>
          <option />
          {currentListOfPeople.map((person => {
            return <option key={`parent1-list-${person.id}`} value={person.id}>{person.name}</option>
          }))}
          <option value={NOT_LISTED}>{NOT_LISTED}</option>
        </select>
      </label>
      <label htmlFor='selectParent2'>
        choose parent 2:
        <select value={personParent2} onChange={(e) => setPersonParent2(e.target.value)}>
          <option />
          {currentListOfPeople.map((person => {
            return <option key={`parent2-list-${person.id}`} value={person.id}>{person.name}</option>
          }))}
          <option value='parent not listed'>parent not listed</option>
        </select>
      </label>
      <label htmlFor='selectPartner'>
        choose partner:
        <select value={personPartner1} onChange={(e) => setPersonPartner1(e.target.value)}>
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
          value={personBio}
          onChange={handlePersonBioChange}
        />
        </label>
      <button type="submit">{editPerson ? 'update' : 'save'}</button>
    </form>  
  );
};

export default FamilyMemberForm;
