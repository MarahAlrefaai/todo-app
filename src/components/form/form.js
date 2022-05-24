import { ControlContext } from '../../context/control.js';
import { useContext } from 'react';
import { Switch } from '@blueprintjs/core';
import useForm from '../../hooks/form.js';
import Auth from '../authorization/authorization'
export default function Form(props) {
const control=useContext(ControlContext);
  const { handleChange, handleSubmit } = useForm(props.addItem);
  const handleComplete =(event)=>{

    control.setViewDone(!control.viewDone);
    console.log(control.viewDone)

  }
return (
  <div id='formHolder'>
    <Auth  capability="create" >
      
  <form id='formHolder1' onSubmit={handleSubmit}>

  <h2>Add To Do Item</h2>

  <label>
    <span>To Do Item</span>
    <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
  </label>

  <label>
    <span>Assigned To</span>
    <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
  </label>

  <label>
    <span>Difficulty</span>
    <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
  </label>

  <label>
    <button type="submit">Add Item</button>
  </label>
</form>
</Auth>
<Switch  checked={control.viewDone} onClick={handleComplete}>view Done Items  </Switch>
<input type="number" placeholder='number Of Items' min='1' max="5" onChange={(e)=>{ control.setNumberOfItems(e.target.value);
}}/>
<button onClick={(e)=>{
  localStorage.setItem("display settings",JSON.stringify(control))
}}>save Settings</button>
</div>
)
}