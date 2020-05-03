import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {db} from "../firebase";
import axios from 'axios';

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

/* For monster spotlight, we're just going to pull a random monster from FB, later ill create an array for n creatures and randomly from there. long, long term, I will use google analytics to pull pages from most searched/view creatures.
 */

const Home = () =>{
    const classes = useStyles();
    const [spacing, setSpacing] = useState(2);
    const [monster, setMonster] = useState([])

    /* Quick way for me to ingress data into FB. This should be a cloud function inside FB that runs daily. */
    // const ingress = () =>{
    //
    //     //make an API hit to get all monsters
    //
    //     // const ingress = monsterIngress
    //     //
    //     // console.log(ingress)
    //
    //     axios.get('https://cors-anywhere.herokuapp.com/https://api.open5e.com/monsters/?format=json&limit=1086', {
    //         headers: {
    //             'Access-Control-Allow-Origin': '*'
    //         }})
    //         .then(function (response) {
    //             // handle success
    //
    //             let monsterArray = response
    //
    //             console.log(monsterArray.data)
    //             console.log(monsterArray.data.results)
    //
    //             monsterArray.data.results.map(monster =>{
    //
    //                 console.log(monster.slug)
    //
    //                 db.collection("monsters").doc(monster.slug).set({
    //                     monster
    //                 })
    //                     .then(function() {
    //                         console.log("Creature added!");
    //                     })
    //                     .catch(function(error) {
    //                         console.error("Error writing document: ", error);
    //                     });
    //             })
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div><br/></div>
                <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <div><br/></div>
                    <Typography variant={"h5"}>Welcome to Our Living Bestiary.</Typography>
                    <Typography variant={"h6"}>Check out our monster spotlights down below, as well all creatures that have been cataloged from adventurers. </Typography>
                </Grid>
                <div><br/></div>
            </Grid>

            <Grid container spacing={2}>
                <Grid container justify="center" spacing={spacing}>
                    <Grid key={"WLTPortal"} item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Creature Name
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   Description
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button  target="_blank" href = 'http://www.dnd5eapi.co/' size="small" color="primary">
                                    Click for More Info
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Home
