import ReactFlow from "react-flow-renderer";
import { useState } from 'react';

const PEOPLE = [
  {
    "name": "Danielle Jones",
    "id": 1,
    "parents": ["Megan Brown", "David Quinn"],
    "partner": [2],
    "children": [3],
    "bio": "TBD lolz"
  },
  {
    "name": "Christopher Guzman",
    "id": 2,
    "parents": ["Michael Dotson", "Eryn Medina"],
    "partner": [1],
    "children": [3],
    "bio": "blah blah"
  },
  {
    "name": "Stephanie Taylor",
    "id": 3,
    "parents": ["Danielle Jones", "Christopher Guzman"],
    "partner": null,
    "children": null,
    "bio": "coolest person ever"
  }
];

let defaultElements = [];

function elementsFromTree(text) {
  const elements = [];
  const partners = [];
  let people = PEOPLE;
  for (let i = 0; i < people.length; i++) {
    let currentElement = {
      id: `${people[i].id}`,
      type: "default",
      data: { label: `${people[i].name}` },
      position: { x: i * 100, y: i * 100 }
    };
    elements.push(currentElement);
    // build partnerships
    if (people[i].partner != null && !partners.flat().includes(people[i].id)) { // instead of null just have empty array
      let partnerElement = {
        id: `p${people[i].id}-${people[i].partner[0]}`,
        type: "default",
        data: { label: `${people[i].id} to ${people[i].partner[0]} partnership` },
        position: { x: i * 120, y: i * 120 }
      };
      elements.push(partnerElement);
      partners.push([people[i].id, people[i].partner[0]]);
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
    if (people[i].partner) { // don't use this! loop through the partners array to make our edges!
      let currentElement = {
        id: `partner${people[i].id}-${people[i].partner[0]}`,
        source: `${people[i].id}`,
        target: `p${people[i].id}-${people[i].partner[0]}`
      }
        elements.push(currentElement);
    }
  }
  return elements;
}


function Nodes() {
  const [elements, setElements] = useState(defaultElements);
  return (
    <div className="pane" id="node-pane">
      <button
        onClick={() => {
          console.log(
            `Refreshing parser definition and generating graph elements for ${PEOPLE}`
          );
          // console.log(JSON.stringify(elementsFromTree(tree, currentEditorContents)));
          setElements(elementsFromTree(PEOPLE));
          //console.log(JSON.stringify(elements, 0, 4));
        }}
      >
        Refresh Graph
      </button>
      <ReactFlow elements={elements} />
    </div>
  );
}

export default function FamilyTree() {
  return (
    <div className="pane" id="node-pane">
      <Nodes></Nodes>
    </div>
  );
}
