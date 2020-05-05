import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {getData, getDocID, paginateData} from "../firebase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from "lodash"


const useStyles = makeStyles((theme) => ({
    expand:{
        width: '100%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
}));

export const Bestiary = () => {
    const classes = useStyles();

    const [monsterData, setMonsterData] = useState([])
    const [loading, setloading] = useState(true)
    const [moreInfo, setMoreInfo] = useState(false)
    const [currentCreature, setCurrentCreautre] = useState([])

    //Function that grabs from FB and punpms the data into state, where we can then use to display to user.
    //This is just a stop gap to get the project running. I need to paginate to min/max reads from FB.
    const getMonsters = () => {

        // console.log(cacheValue.length)

            getData("monsters").then(monsterList => {
                monsterList = monsterList.map((monster) => {
                    const monsterData = monster.data()
                    // console.log(monsterData)
                    return (
                        {...monsterData}
                    )
                })
                setMonsterData(monsterList)
                setloading(false)

            }).catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        getMonsters()
    }, [])

    const columns = [
        {
            title: "Creature Name",
            field: "name",
            filtering: false,
            grouping: true
        },
        {
            title: "Alignment",
            field: "alignment",
            filtering: false,
            grouping: true
        },
        {
            title: "Armor Class",
            field: "ac",
            filtering: false,
            grouping: true
        },
        {
            title: "Constitution",
            field: "constitution",
            filtering: false,
            grouping: true
        },
        {
            title: "Charisma",
            field: "charisma",
            filtering: false,
            grouping: true
        },
        {
            title: "Dexterity",
            field: "dexterity",
            filtering: false,
            grouping: true
        },
        {
            title: "Strength",
            field: "strength",
            filtering: false,
            grouping: true
        },
        {
            title: "Intelligence",
            field: "intelligence",
            filtering: false,
            grouping: true
        },
        {
            title: "Wisdom",
            field: "wisdom",
            filtering: false,
            grouping: true
        }
    ];

    const mainArray = monsterData.length === 0 ? [] : monsterData.map(function (data, index) {

        const monster = data.monster

        return {
            name: monster.name,
            alignment: monster.alignment,
            ac: monster.armor_class,
            constitution: monster.constitution,
            charisma: monster.charisma,
            dexterity: monster.dexterity,
            intelligence: monster.intelligence,
            strength: monster.strength,
            wisdom: monster.wisdom,
            allData: data.monster
        }
    });

    function getAdditionalinfo(currentCreature){

        if (currentCreature === undefined || currentCreature.length === 0){
            return null
        } else{
            return(
                <>
                    <Dialog
                        fullWidth={true}
                        maxWidth={"md"}
                        open={moreInfo}
                        onClose={e =>{setMoreInfo(false)}}
                        aria-labelledby="max-width-dialog-title"
                    >
                        <DialogTitle id="max-width-dialog-title">Creature Info</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography align="center">
                                    Additional Information
                                </Typography>

                            </DialogContentText>

                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Actions</Typography>
                                </ExpansionPanelSummary>

                                {currentCreature.actions === undefined ?

                                    <>
                                        <ExpansionPanelDetails>
                                            <Typography >
                                                {currentCreature.name} does not have any actions (That we know of so far).
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </> : <>

                                        {currentCreature.actions.map((action) => {

                                            return(
                                                <ExpansionPanelDetails>
                                                    <Typography >
                                                        {action.name}: {action.desc}
                                                    </Typography>
                                                </ExpansionPanelDetails>)
                                        })}
                                    </>
                                }
                            </ExpansionPanel>

                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Skill Checks</Typography>
                                </ExpansionPanelSummary>
                                <>{ _.isEmpty(currentCreature.skills) === true ?
                                    <>
                                        <ExpansionPanelDetails>
                                            <Typography >
                                                {currentCreature.name} does not have any S\skills (That we know of so far).
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </>: <>

                                        {Object.entries(currentCreature.skills).map(([key, value]) => {
                                            //Since it's an object we'll have to map it differently.
                                            if (_.isEmpty(currentCreature.skills) === false){
                                                return (
                                                    <ExpansionPanelDetails>
                                                        <Typography>{" "} {key}: {value}</Typography>
                                                    </ExpansionPanelDetails>)
                                            }
                                        })}
                                        </>
                                }
                                </>
                            </ExpansionPanel>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={e =>{setMoreInfo(false)}} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </>
            )
        }
    }

    return (

        <Grid container  spacing={2}>
            <Grid item xs={12}>
                <div><br/></div>
                <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <div><br/></div>
                    <Typography variant={"h6"}>Use this table to check out creatures that have already been
                        identified.</Typography>
                </Grid>
                <div><br/></div>
            </Grid>
            <Grid container  spacing={2}>
                <Grid container justify="center" spacing={2}>
                        <MaterialTable
                            title={`Bestiary`}
                            columns={columns}
                            data={mainArray}
                            isLoading={loading}
                            actions={[
                                {
                                    icon: FindInPageIcon,
                                    tooltip: 'View More',
                                    onClick: (event, rowData) => {
                                        setMoreInfo(true)
                                        setCurrentCreautre(rowData.allData)
                                    }
                                }
                            ]}

                            // onChangePage={e =>{
                            //     //do pagination here
                            //
                            //     let lastMonster = monsterData.slice(-1).pop()
                            //     console.log(   getDocID(lastMonster.monster.slug).then(x =>{c}))
                            // }}

                            localization={{
                                pagination: {
                                    nextTooltip: 'Next!',
                                }
                            }}
                        />
                </Grid>
            </Grid>

            <>{getAdditionalinfo(currentCreature)}</>

        </Grid>
    )
}
