import { useState, useEffect } from 'react';

const Input = (props) =>{
    console.log(props);

    return (
        <>
             <input type="checkbox" id={props.id} name={props.name} value="Bike"/>
        </>
    )
}

export default Input;