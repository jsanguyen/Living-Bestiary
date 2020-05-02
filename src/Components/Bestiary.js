import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {getData} from "../firebase";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FindInPageIcon from '@material-ui/icons/FindInPage';

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
        localStorage.getItem(localStorageKey) || null
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};


export const Bestiary =() =>{

    const [monsterData, setMonsterData] = useState([])
    const [loading, setloading] = useState(true)

    //I just created a UUID to make sure the cachekey will always be unique.
    const [cacheValue, setCacheValue] = useStateWithLocalStorage(
        'b1ddb449-3766-4cbb-82cc-eead6ae673452'
    );



    //Function that grabs from FB and punpms the data into state, where we can then use to display to user.
    const getMonsters =()=>{

        console.log(cacheValue.length)

        if (cacheValue === null || cacheValue.length < 5){

            console.log("No Cache")

            getData("monsters").then(monsterList => {
                monsterList = monsterList.map((monster) => {
                    const monsterData = monster.data()
                    console.log(monsterData)
                    return(
                        {...monsterData}
                    )
                })

                /*To reduce the amount of reads from a constant users, we'll cache the data to their browser. Long term I will need to cache the date.
                 If the data is 30 days or older, update the cache. */
                setMonsterData(monsterList)
                setCacheValue(JSON.stringify(monsterList))
                setloading(false)

            }).catch(err => {
                console.log(err)
            })

        } else {
            setloading(false)
            return setMonsterData(JSON.parse(cacheValue))
        }
    }

    useEffect(() =>{
        getMonsters()
    },[])

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

    const mainArray = monsterData.length === 0 ? [] : monsterData.map(function(data, index) {

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
            wisdom: monster.wisdom
        }
    });

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center" spacing ={2}>
                <Grid item xs={12}>
                    <div><br/></div>
                    <Grid container direction="column" justify="space-evenly" alignItems="center">
                        <div><br/></div>
                        <Typography variant={"h5"}>Use the table below to view the creature that have currently been identified.</Typography>
                    </Grid>
                    <div><br/></div>
                </Grid>
                                <MaterialTable
                                    title={`Bestiary`}
                                    columns={columns}
                                    data={mainArray}
                                    isLoading={loading}
                                    actions={[
                                        {
                                            icon: FindInPageIcon,
                                            tooltip: 'View More',
                                            onClick: (event, rowData) => console.log("View More Info")
                                        }
                                    ]}
                                    options={{
                                        actionsColumnIndex: -1,
                                    }}
                                />
                </Grid>
            </>
    )
}
