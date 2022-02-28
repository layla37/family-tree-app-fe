import ReactFlow from "react-flow-renderer";
import { useEffect, useState } from 'react';

// const PEOPLE = [
//   {
//     "name": "Bill Jones",
//     "id": 100,
//     "parents": [],
//     "partners": [101],
//     "children": [1],
//     "bio": "TBD lolz"
//   },
//   {
//     "name": "Jill Jones",
//     "id": 101,
//     "parents": [],
//     "partners": [100],
//     "children": [1],
//     "bio": "TBD lolz"
//   },
//   {
//     "name": "Danielle Jones",
//     "id": 1,
//     "parents": [100, 101],
//     "partners": [2],
//     "children": [3],
//     "bio": "TBD lolz"
//   },
//   {
//     "name": "Christopher Guzman",
//     "id": 2,
//     "parents": [200, 201],
//     "partners": [1],
//     "children": [3],
//     "bio": "blah blah"
//   },
//   {
//     "name": "Stephanie Taylor",
//     "id": 3,
//     "parents": [1, 2],
//     "partners": [],
//     "children": [],
//     "bio": "coolest person ever"
//   },
//   {
//     "name": "john Taylor",
//     "id": 4,
//     "parents": [1, 2],
//     "partners": [],
//     "children": [],
//     "bio": "2nd coolest person ever"
//   }
// ];

const defaultElements = [];

function elementsFromTree(people) {
  const elements = [];
  const partners = [];
  const partnershipNodeIds = [];

  for (let i = 0; i < people.length; i++) {
    let currentPerson = people[i];
    let hasPartner = currentPerson.partners && currentPerson.partners.length > 0;
    // let hasNotBeenConnectedToPartnerYet = hasPartner && !partners.flat().includes(people[i].id);
    let PersonNode = {
      id: `${currentPerson.id}`,
      type: "default",
      data: { label: `${currentPerson.name}` },
      position: { x: i * 100, y: i * 100 },
      // draggable: false
    };
    elements.push(PersonNode);
    // build partnership nodes
    //if (hasPartner && hasNotBeenConnectedToPartnerYet) {
    if (hasPartner) {
      currentPerson.partners.forEach((partner, partnerIndex) => {
        
        let partnershipNode = {
          id: `partnership-${currentPerson.id}-${currentPerson.partners[partnerIndex]}`,
          type: "default",
          className: "partnership-node",
          data: { label: `${currentPerson.id} to ${currentPerson.partners[partnerIndex]} partnership` },
          position: { x: i * 120, y: i * 120 },
          // draggable: false
        };
        let flattenedPartnershipArray = partners.flat();
        let partnershipNodeExists = flattenedPartnershipArray.includes(currentPerson.id) && flattenedPartnershipArray.includes(currentPerson.partners[partnerIndex]);
        if (!partnershipNodeExists) {
          partnershipNodeIds.push(partnershipNode.id);
          partners.push([currentPerson.id, currentPerson.partners[partnerIndex]]);
          elements.push(partnershipNode);
        }      
      });
    }
  }

  const getParentsPartnershipNodeId = (parentsIdArray) => {
    // check partnershipNodeIds for parents IDs
    return partnershipNodeIds.find(id => {
      if (parentsIdArray.length === 1) {
        return id.includes(parentsIdArray[0]);
      } else {
        return id.includes(parentsIdArray[0]) && id.includes(parentsIdArray[1]);
      }
    });
  };

  const findPartnershipNodeId = (personId, partnerId) => {
    // check partnershipNodeIds for partner's ID and their ID
    return partnershipNodeIds.find(id => {
      return id.includes(personId) && id.includes(partnerId);
    })
  };

   // edge creation logic
   for (let i = 0; i < people.length; i++) {
    if (people[i].parents.length > 0) {
      // look for partnership node ID of parents
      let parentsPartnershipNodeId = getParentsPartnershipNodeId(people[i].parents); 
      let parentsPartnershipNodeToChildEdge = {
        id: `parents${parentsPartnershipNodeId}-${people[i].id}`,
        type: 'step',
        source: `${people[i].id}`,
        target: `${parentsPartnershipNodeId}`
      };
      elements.push(parentsPartnershipNodeToChildEdge);
    }

    if (people[i].partners && people[i].partners.length > 0) { // TODO: loop through the partners array to make our edges!
      let partnershipNodeId = findPartnershipNodeId(people[i].id, people[i].partners[0]);
      let partnershipEdge = {
        id: `partnership-edge-${people[i].id}-${people[i].partners[0]}`,
        source: `${people[i].id}`,
        target: partnershipNodeId
      }
      elements.push(partnershipEdge);
    }
  }
  
  return elements;
}


export default function FamilyTree({ people }) {
  const [elements, setElements] = useState(defaultElements);
console.log("people = " , people)
  useEffect(() => {
    setElements(elementsFromTree(people));
  }, [people]);
  return (
    <div className="pane" id="node-pane">
      <ReactFlow elements={elements} />
    </div>
  );
}


