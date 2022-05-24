import { ControlContext } from "../../context/control"
import { useContext } from "react"
import { LoginContext } from '../../context/Auth.js';
import { Card } from "@blueprintjs/core";
import Auth from '../authorization/authorization'
export default function List (props){
  const control=useContext(ControlContext);
  const authentincation = useContext(LoginContext); 
  if(control.viewDone){ 
   
return(



<div className="mylist">
{props.list.map(item => (
 
        <Card className="myitem" key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() =>authentincation.canDo('update')?props.toggleComplete(item.id):""}>Complete: {item.complete.toString()}</div>
          <hr />
          <Auth  capability="delete">
          <button  id="Delete" onClick={()=>{
            props.deleteItem(item.id)
            }} >Delete</button>
            </Auth>
        </Card>
      ))}
</div>
)
          }
          else{
              return (
                <div className="mylist">{props.list.filter((item)=>!item.complete ).map(item => (
 
                  <Card className="myitem" key={item.id}>
                    <p>{item.text}</p>
                    <p><small>Assigned to: {item.assignee}</small></p>
                    <p><small>Difficulty: {item.difficulty}</small></p>
                    <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
                    <hr />
                    <button  id="Delete" onClick={()=>{
                      props.deleteItem(item.id)
                      }} >Delete</button>
                  </Card>   
                ))}</div>
              )  
          }


}