import {makeStyles} from "@material-ui/core";

export const useStyles = paddingTop => makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        display: 'flex',
        flexWrap: 'wrap',
    },
    typo: {
        width: '100%',
        maxWidth: 700,
    },
    table: {
        padding: theme.spacing(20, 5),
        display: 'flex',
        flexWrap: 'wrap',
    },
    downloadButton: {
        padding: theme.spacing(2, 5),
        display: 'flex',
        flexWrap: 'wrap',
    },
    loading:{
        padding: theme.spacing(20, 5),
        display: 'flex',
        flexWrap: 'wrap',
    },
    square: false,

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 400,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        minHeight: 340
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    card: {
        width: 650,
    },
    media: {
        paddingTop: paddingTop, // 16:9
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 325,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: 200,
        }
    }
}))();
