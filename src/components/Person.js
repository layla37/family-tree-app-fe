import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { peopleRequest } from './../services/people';

const Person = ({ person, removePerson }) => {
  const [parents, setParents] = useState([]);
  
  const getParentsArray = () => {
    person.parents.forEach(id => {
      peopleRequest
      .get(id)
        .then(returnedPerson => {
          if (returnedPerson) {
            setParents((parents) => parents.concat({name: returnedPerson.name, id: returnedPerson.id}));
          } else {
            console.error('parent not found in DB with ID of ', id )
          }
      })
    });
  }
  // update using ref instead of useEffect
  useEffect(() => {
    if (person.parents) {
      getParentsArray();
    }
  }, []);

  const deletePerson = (personId) => {
    removePerson(personId);
  }

  return (
    <li className='person'>
      <Link to={`/family-members/${person.url}`}>Name: {person.name}</Link>
      <div>Parents: 
        {parents.map(parent => {
          return <div key={`${person.id}-${parent.id}`}>{parent.name}</div>;
        })}
      </div>
      <div>Bio: {person.bio}</div>
      <button onClick={() => deletePerson(person.id)}>Delete {person.name} from DB</button>

    </li>
  )
}

export default Person
