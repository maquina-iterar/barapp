import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 5px 20px -5px rgba(0, 0, 0, 0.25)",
  },
  media: {
    height: 140,
  },
});

const STARS_NUMBER = 5;

const Bar = ({ value }) => {
  const classes = useStyles();

  const {
    nombre,
    fotoUrl,
    descripcion,
    meGusta = 0,
    noMeGusta = 0,
    _id,
  } = value;

  const votantesCount = meGusta + noMeGusta;

  const rating =
    votantesCount > 0 ? (meGusta / votantesCount) * STARS_NUMBER : -1;

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/bar/${_id}`}>
        <CardMedia className={classes.media} image={fotoUrl} title={nombre} />
        <CardContent style={{ paddingBottom: 24 }}>
          <div style={{ display: "flex" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{
                fontWeight: "bold",
                color: "#434347",
                display: "block",
                flex: 1,
              }}
            >
              {nombre}
            </Typography>
            {rating !== -1 && (
              <StyledRating value={rating} readOnly style={{ paddingTop: 4 }} />
            )}
          </div>
          <Typography
            variant="body2"
            component="p"
            style={{ color: "#83848C" }}
          >
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Bar;

const StyledRating = withStyles({
  iconFilled: {
    color: "#D69C00",
  },
  iconEmpty: {
    color: "#DBDDE1",
  },
})(Rating);
