import Person from './Person';

const FamilyMemberList = ({ people, removePerson }) => {
  return (
    <div>
      <h1>Family Memberzzz</h1>
      <ul>
        {people.map(person => 
            <Person
              key={person.id}
              person={person}
              removePerson={removePerson}
            />
        )}
      </ul>
    </div>    
  );

};

export default FamilyMemberList;