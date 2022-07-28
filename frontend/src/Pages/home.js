import React, { useState } from 'react';

import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Card from '../components/Card';
import Products from '../components/Products';
import Category from '../components/Category'
import products from '../components/store/reducers/product'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '5px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center'
    },
  }));

const HomePage = () => {
       
    const classes = useStyles();

    const [content, setContent] = useState(products);
  

    const deleteItemHandler = (goalId, checked) => {
        console.log('goalId, checked');
        console.log(goalId, checked);
        setContent(prevList => {
            let updatedList = prevList;
            console.log(prevList);
            if (checked === false){
                updatedList = prevList.filter(item => item.id_categorys !== goalId);
            }else{
                updatedList = prevList.concat(products.filter(item => item.id_categorys === goalId));
            }
        
          return updatedList;
        });
      };
    
    return(
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>
                        Filtrar por categoria:
                    </Typography>

                    <Category onSelect={ deleteItemHandler}/>
                </Paper>
            </Grid>
            <Grid container xs={9} spacing={3} className={classes.root}>
                <Products products={content}/> 
            </Grid>
        </Grid>
    )
}

export default HomePage;
