import React, { useState, useEffect } from 'react';
import { getComplejosById } from "api/complejos";
import { Grid, CircularProgress } from "@material-ui/core";
import Slider from 'infinite-react-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 350,
    },

}))

const VerFotos = () => {

    const classes = useStyles();
    const idComplejo = "HijkhSYMeyCDSlkd2x6E";
    const [complejo, setComplejo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

    console.log(complejo)

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

                <Grid contaner>

                    <Slider >
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
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Lizard
          </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                across all continents except Antarctica
          </Typography>
                                        </CardContent>
                                    </CardActionArea>                                
                                    </Card>
                            </Grid>
                        )
                        )}
                    </Slider>
                </Grid>
            )}
        </>
    )
}

export default VerFotos
