import React from 'react';

import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Card from '../components/Card';
import Products from '../components/Products';
import Category from '../components/Category'

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

    
    return(
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>
                        Categorias
                    </Typography>

                    <Category/>
                </Paper>
            </Grid>
            <Grid container xs={9} spacing={3} className={classes.root}>
                <Products/> 
            </Grid>
        </Grid>
    )
}

export default HomePage;
