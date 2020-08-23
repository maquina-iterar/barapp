import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
  },
});

const DetalleBar = () => {
  const classes = useStyles();

  const { id } = useParams();

  const { isLoading, data: bar = {}, error } = useQuery(["bar", id], getBar);

  const { nombre, fotoUrl, descripcion, ubicacionUrl } = bar;

  return (
    <Layout>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={fotoUrl} title={nombre} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descripcion}
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DetalleBar;

const getBar = async (_, id) => {
  const apiUrl = `${environment.apiUrl}/${id}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
