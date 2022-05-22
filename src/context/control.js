import React from 'react'
import {useState}  from 'react'

export const ControlContext= React.createContext();
export default function Control (props){
const [viewDone,setViewDone]=useState(true);
const [numberOfItems,setNumberOfItems]=useState(5);

const state={viewDone , setViewDone , numberOfItems , setNumberOfItems};
return (
  <ControlContext.Provider value={state}>
{props.children}

  </ControlContext.Provider>
)}
