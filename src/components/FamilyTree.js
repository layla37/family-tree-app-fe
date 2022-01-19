import ReactFlow from "react-flow-renderer";
import { useEffect, useState } from 'react';

const PEOPLE = [
  {
    "name": "Danielle Jones",
    "id": 1,
    "parents": [100, 101],
    "partners": [2],
    "children": [3],
    "bio": "TBD lolz"
  },
  {
    "name": "Christopher Guzman",
    "id": 2,
    "parents": [200, 201],
    "partners": [1],
    "children": [3],
    "bio": "blah blah"
  },
  {
    "name": "Stephanie Taylor",
    "id": 3,
    "parents": [1, 2],
    "partners": [],
    "children": [],
    "bio": "coolest person ever"
  }
];

const defaultElements = [];

function elementsFromTree(people) {
  const elements = [];
  const partners = [];

  for (let i = 0; i < people.length; i++) {
    let currentPerson = people[i];
    let hasPartner = currentPerson.partners != null && currentPerson.partners.length > 0;
    // let hasNotBeenConnectedToPartnerYet = hasPartner && !partners.flat().includes(people[i].id);
    let PersonNode = {
      id: `${currentPerson.id}`,
      type: "default",
      data: { label: `${currentPerson.name}` },
      position: { x: i * 100, y: i * 100 },
      // draggable: false
    };
    elements.push(PersonNode);
    // build partnerships
    //if (hasPartner && hasNotBeenConnectedToPartnerYet) {
      if (hasPartner) {
        currentPerson.partners.forEach((partner, partnerIndex) => {
          
          let partnershipNode = {
            id: `p${currentPerson.id}-${currentPerson.partners[partnerIndex]}`,
            type: "default",
            data: { label: `${currentPerson.id} to ${currentPerson.partners[partnerIndex]} partnership` },
            position: { x: i * 120, y: i * 120 },
            // draggable: false
          };
          let flattenedPartnershipArray = partners.flat();
          let partnershipNodeExists = flattenedPartnershipArray.includes(currentPerson.id) && flattenedPartnershipArray.includes(currentPerson.partners[partnerIndex]);
          if (!partnershipNodeExists) {
            partners.push([currentPerson.id, currentPerson.partners[partnerIndex]]);
            elements.push(partnershipNode);
          }
          
        });
      
 
    }
  }
  
  // edge creation logic
  for (let i = 0; i < people.length; i++) {
    if (people[i].children) { // make sure not an empty array
      let currentElement = {
        id: `parent${people[i].id}-${people[i].children}`,
        type: 'straight',
        source: `${people[i].id}`,
        target: `${people[i].children}`
      };
      elements.push(currentElement);
    }
    if (people[i].partners) { // TODO: loop through the partners array to make our edges!
      // TODO filter out any duplicates of parntership IDs
      let currentElement = {
        id: `partner${people[i].id}-${people[i].partners[0]}`,
        source: `${people[i].id}`,
        target: `p${people[i].id}-${people[i].partners[0]}`
      }
        elements.push(currentElement);
    }
    // TODO edge from partner node to children. Try using {type: 'step'} for partner node to children edges
  }
  return elements;
}


export default function FamilyTree() {
  const [elements, setElements] = useState(defaultElements);

  useEffect(() => {
    setElements(elementsFromTree(PEOPLE));
  }, []);
  return (
    <div className="pane" id="node-pane">
      <ReactFlow elements={elements} />
    </div>
  );
}


