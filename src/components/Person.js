import React, { useEffect, useState } from 'react';
import peopleRequest from '../services/people';

const Person = ({ person }) => {
  const [parents, setParents] = useState([]);
  
  const getParentsArray = () => {
    person.parents.forEach(async id => {
      await peopleRequest
      .get(id)
        .then(returnedPerson => {
          setParents((parents) => parents.concat({name: returnedPerson.name, id: returnedPerson.id}));
      })
    });
  }
  // update using ref instead of useEffect
  useEffect(() => {
    if (person.parents) {
      getParentsArray();
    }
  }, []);

  return (
    <li className='person'>
      <div>Name: {person.name}</div>
      <div>Parents: 
        {parents.map(parent => {
          return <div key={`${person.id}-${parent.id}`}>{parent.name}</div>;
        })}
      </div>
      <div>Bio: {person.bio}</div>
    </li>
  )
}

export default Person
