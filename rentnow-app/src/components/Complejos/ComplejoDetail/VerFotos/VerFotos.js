import React, { useState, useEffect } from 'react';

// API
import { getComplejosById } from "api/complejos";

// Material UI
import { Grid, CircularProgress, Typography, Container, 
    Divider, IconButton, Card, CardActionArea, CardMedia,
    Fab
 } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// Slider
import Slider from 'infinite-react-carousel';

// Router
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

// Iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";



const useStyles = makeStyles((theme) => ({
    media: {
        height: 350,
    },
    section: {
        top: '50%',
    },
    tituloSeccion: {
        textAlign: 'center'
    },
    returnButton: {
        position: 'absolute',
        top: theme.spacing(11),
        left: theme.spacing(2),
        zIndex: 2,
        boxShadow: "5px 5px 5px 1px rgba(0, 0, 0, 0.2)"
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}))

const VerFotos = () => {
    const history = useHistory();

    const classes = useStyles();
    const [complejo, setComplejo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { idComplejo } = useParams();

    useEffect(() => {
        getComplejosById(idComplejo).then((response) => {
            if (response.status === "OK") {
                setComplejo(response.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });

    }, [idComplejo]);

    const handleRouteComplejo = () => {
        history.push(`/complejos/${idComplejo}`);
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", marginLeft: '10px' }}>
                <IconButton style={{ backgroundColor: "gray" }}>
                    <ArrowBackIcon style={{ color: "white" }} onClick={onClick} />
                </IconButton>
            </div>
        );
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", marginRight: '10px' }}>
                <IconButton style={{ backgroundColor: "gray" }}>
                    <ArrowForwardIcon style={{ color: "white" }} onClick={onClick} />
                </IconButton>
            </div>
        );
    }

    const settings = {
        arrowsBlock: true,
        arrows: true,
        dots: true,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <>
            {isLoading ? (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                <div className={classes.section}>
                    <Grid item xs={12} md={12}>
                        <Typography className={classes.tituloSeccion} variant="h4" gutterBottom>
                            Fotos del Complejo {complejo.nombre}
                        </Typography>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Container maxWidth="xl">

                        <Slider {...settings}>
                            {complejo.fotos.map((foto) => (
                                <Grid item key={foto} xs={12}>
                                    <Card >
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={foto}
                                                title="Contemplative Reptile"
                                            />

                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                            )}
                        </Slider>
                    </Container>
                </ div>
            )}
            <Fab
                aria-label='returnButton'
                className={classes.returnButton}
                color='secondary'
                onClick={handleRouteComplejo}
            >
                <ChevronLeftIcon />
            </Fab>
        </>
    )
}

export default VerFotos
