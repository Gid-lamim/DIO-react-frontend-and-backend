import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Item from './Item';

const Category = () => {
    
    const products = useSelector(state => state.products);
    

    const categorys = products.map(
        category => {
            const container = { };
            container['id'] = category.id_categorys;
            container['name'] = category.name_categorys;
            return container;
        }
    )

    const category = categorys.map(JSON.stringify)
                    .filter(function(item, index, arr){
                        return arr.indexOf(item, index + 1) === -1;
                    })
                    .map(JSON.parse)

    const arrayCategory = categorys.map(category => category.name)
    let count = { };

    for(let i = 0; i < arrayCategory.length; i++){
        
            let key = arrayCategory[i];
            count[key] = (count[key] ? count[key] + 1 : 1)
        
    }
    return(
        <List>
            {category.map(
                category => {
                    return (
                        <Item
                            key = {category.id} 
                            name= {category.name}
                            details={count[category.name]}
                        />
                    )
                }
            )}
        </List>
            
    )
}

export default Category;