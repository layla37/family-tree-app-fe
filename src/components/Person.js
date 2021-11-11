import React from 'react'

const Person = ({ person }) => {
  const parents = person.parents || [];
  return (
    <li className='person'>
      <div>Name: {person.name}</div>
      <div>Parents: 
        {parents.map(parent => {
          return <div>{parent}</div>;
        })}
      </div>
      <div>Bio: {person.bio}</div>

    </li>
  )
}

export default Person
