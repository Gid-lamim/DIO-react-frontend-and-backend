import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Card from './Card';


const Products = (props)  =>{

    
console.log(props.products);
console.log('props');
return<>
                {props.products.map(item => {
                    
                    return(
                        <>
                        <Card
                            key={item.id_product}
                            product={item}
                        >
                            {item.name_product}
                        </Card>
                        </>
                    )
                })}
        </>

}

export default Products;