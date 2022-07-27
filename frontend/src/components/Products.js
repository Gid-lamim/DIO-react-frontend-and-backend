import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Item from './Item';
import Card from './Card';

const Products = ()  =>{
const products = useSelector(state => state.products)


return<>
                {products.map(item => {
                    
                    return(
                        <Card
                            key={item.id_product}
                            product={item}
                        >
                            {item.name_product}
                        </Card>
                    )
                })}
        </>

}

export default Products;