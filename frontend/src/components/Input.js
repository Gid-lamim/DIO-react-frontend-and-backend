import { useState, useEffect } from 'react';

const Input = (props) =>{

    const [checked, setChecked] = useState(true);
    
    const click = ()=> {
        props.onClick(!checked);
        setChecked(!checked);
        
    }

    return (
        <>
             <input checked={checked} onClick={()=>click()} type="checkbox" id={props.id} name={props.name} value="Bike"/>
        </>
    )
}

export default Input;