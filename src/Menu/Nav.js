import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import _ from 'lodash'
import Typography from "@material-ui/core/Typography";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function NavLink() {

    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(true)

    //In the future, if we have multiple roles, I can pick and chose which role view will see from this array via the addItemfunction.
    const allItems = [
        {external: false, to: "/", key: "Home", label: "Home"},
        {external: false, to: "/bestiary/", key: "bestiary", label: "Bestiary"},
        {external: false, to: "/release/", key: "release", label: "Release Notes"},
    ]

    const addItem = (value) => allItems.find( ({ key }) => key === value );

    const handleClick = (setOpen, open) => {
        setOpen(!open);
    };

    const userView = [
        addItem('Home'),
        addItem('bestiary'),
        addItem('release'),
    ]

    const userDrawer =
        [{name: 'User Tools', items: userView, listOpen: menuOpen, setOpen: setMenuOpen}]

    //leave it like this in case we want to add role based menus later on
    const menu = _.union(userDrawer)

    return (
        <div>
            {menu.map(list => {
                return (
                    <div key={list.name}>
                        <List className={classes.root}>

                            <ListItem button onClick={e => {
                                handleClick(list.setOpen, list.listOpen)
                            }}>
                                <Typography> {list.name}</Typography>
                                {list.listOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>

                            <Collapse in={list.listOpen} timeout="auto" unmountOnExit>

                                {list.items.map((item) => {
                                    return (
                                        item.external === false ?
                                            <div key={item.name}>

                                                <Link style={{textDecoration: 'none'}} to={item.to}>

                                                    <ListItem button key={item.key}>
                                                        <ListItemText primary={item.label}/>
                                                    </ListItem>
                                                </Link>
                                            </div> :

                                            <Link
                                                style={{textDecoration: 'none'}}
                                                to={item.to}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    window.open(item.url);
                                                }}
                                            >
                                                <ListItem button key={item.key}>
                                                    <ListItemText primary={item.label}/>
                                                </ListItem>
                                            </Link>
                                    )
                                })}
                            </Collapse>
                        </List>
                        <Divider/>
                    </div>
                );
            })}
        </div>
    )
}
