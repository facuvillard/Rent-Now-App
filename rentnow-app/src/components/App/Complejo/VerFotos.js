import React, { useState, useEffect } from 'react';
import { getComplejosById } from "api/complejos";
import { Grid, CircularProgress, Typography, Container} from "@material-ui/core";
import Slider from 'infinite-react-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useParams } from 'react-router';



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
}))

const VerFotos = () => {

    const classes = useStyles();
    const [complejo, setComplejo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        getComplejosById(id).then((response) => {
            if (response.status === "OK") {
                setComplejo(response.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });

    }, [id]);

    console.log(complejo)

    const settings = {
        arrowsBlock: false,
        arrows: false,
        dots: true
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
                        <Typography className={classes.tituloSeccion} variant="h5" gutterBottom>
                        Fotos del Complejo {complejo.nombre}
                </Typography>
                    </Grid>

                    <Container maxWidth="xl">

                        <Slider {...settings}>
                            {complejo.fotos.map((foto) => (
                                <Grid item key={foto} xs={12}>
                                    {/* <img src={foto} alt={foto} /> */}
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
        </>
    )
}

export default VerFotos
