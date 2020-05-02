import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme =>( {
    card: {
        maxWidth: 600,
    },  root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    }
}));

const Release = () =>{
    const classes = useStyles();
    const [spacing, setSpacing] = useState(2);

    return (
        <>
        <h4>Release Notes</h4>
            </>

    );
}

export default Release
