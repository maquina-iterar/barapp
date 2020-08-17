import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
  },
});

const Bar = ({ nombre, fotoUrl, descripcion, ubicacionUrl }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={"a"} href={ubicacionUrl} target="_blank">
        <CardMedia className={classes.media} image={fotoUrl} title={nombre} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Bar;
