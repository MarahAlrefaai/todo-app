import { useContext } from 'react';
import {When} from 'react-if'
import { LoginContext } from '../../context/Auth.js';
export default function Header (props){
  const authentincation = useContext(LoginContext);
return(
<header>
<h1>To Do List: {props.incomplete} items pending</h1>
<When condition ={authentincation.loggedIn} >
<button onClick={(e)=>{
  authentincation.logout();
}} >LogOut</button>
</When>
</header>

)}