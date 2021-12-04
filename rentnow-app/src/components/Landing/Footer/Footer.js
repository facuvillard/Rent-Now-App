import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid, Link } from '@material-ui/core'
import argentinaImage from "assets/Landing/argentina-logo.png"
import IconButton from '@material-ui/core/IconButton';
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#1C1C1C',
    },
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
    },
    iconsWrapper: {
        height: 120,
    },
    icons: {
        display: 'flex',
        marginLeft: theme.spacing(2)
    },
    icon: {
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    language: {
        marginTop: theme.spacing(1),
        width: 150,
    },
    subrayado: {
        height: 2,
        width: 20,
        display: 'block',
        background: "rgb(255,255,255) linear-gradient(90deg, rgba(0,0,0,0.7517401392111369) 0%, rgba(255,255,255) 0%)",
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Typography component="footer" className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Grid item xs={6} sm={8} md={4} className={classes.icons}>
                    <Typography style={{ color: '#FAFAFA'}} variant="h6" marked="left" gutterBottom>
                        <b>REDES</b>
                        <span className={classes.subrayado} />
                    </Typography>
                    <IconButton style={{ color: '#FAFAFA'}} href="https://www.facebook.com" aria-label="Facebook">
                        <Facebook />
                    </IconButton>
                    <IconButton style={{ color: '#FAFAFA'}} href="https://twitter.com" aria-label="Twitter">
                        <Twitter />
                    </IconButton>
                    <IconButton style={{ color: '#FAFAFA'}} href="https://www.instagram.com" aria-label="Instagram">
                        <Instagram />
                    </IconButton>
                </Grid>
                <Grid item xs={6} sm={8} md={4} style={{ display: 'flow-root'}}>
                    <Typography style={{ color: '#FAFAFA'}} variant="h6" marked="left" gutterBottom>
                        <b>PAISES</b>
                        <span className={classes.subrayado} />
                    </Typography>
                    <img className={classes.icon} src={argentinaImage} alt="Argentina" />
                </Grid>
            </Grid>
        </Typography>
    )
}

export default Footer
