import { useContext } from "react";
import { LoginContext } from "../../context/Auth";
import { When } from 'react-if';


export default function Auth(props) {

    const auth = useContext(LoginContext)

    const isLoggedIn = auth.loggedIn;
    const can = auth.canDo(props.capability);

    return(
        <When condition={isLoggedIn && can}>
            {props.children}
        </When>
    )
}