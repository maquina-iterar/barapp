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

const caracteriscasLabels = {
  opcionVegetariana: "¿Tiene opción vegetariana?",
  musiscaEnVivo: "¿Hay música en vivo?",
  espacioAlAireLibre: "¿Tiene espacio al aire libre?",
};

const DetalleBar = () => {
  const classes = useStyles();

  const { id } = useParams();

  const { isLoading, data: bar = {}, error } = useQuery(["bar", id], getBar);

  console.log("bar", bar);

  const {
    nombre,
    fotoUrl,
    descripcion,
    direccion,
    pais,
    contactos,
    caracteristicas,
    ubicacionUrl,
  } = bar;

  return (
    <Layout backUrl="/">
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={fotoUrl} title={nombre} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descripcion}
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Typography gutterBottom variant="subtitle1" component="span">
              Dirección:
            </Typography>
            <a href={ubicacionUrl} rel="noopener noreferrer" target="_blank">
              <Typography gutterBottom variant="subtitle1" component="span">
                {`${direccion}, ${pais}`}
              </Typography>
            </a>
          </div>
          <Typography gutterBottom variant="h5" component="span">
            Características
          </Typography>
          {caracteristicas &&
            Object.keys(caracteristicas).map((caracteristica) => (
              <div style={{ display: "flex", gap: "20px", marginTop: 5 }}>
                <Typography gutterBottom variant="subtitle1" component="span">
                  {`${caracteriscasLabels[caracteristica]}:`}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="span">
                  {formatCaracteristica(caracteristicas[caracteristica])}
                </Typography>
              </div>
            ))}
          <Typography gutterBottom variant="h5" component="span">
            Contactos
          </Typography>
          {contactos &&
            contactos.map((contacto) => (
              <div style={{ display: "flex", gap: "20px", marginTop: 5 }}>
                <a
                  href={contacto.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Typography gutterBottom variant="subtitle1" component="span">
                    {contacto.redSocial}
                  </Typography>
                </a>
              </div>
            ))}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DetalleBar;

const formatCaracteristica = (value) => {
  if (typeof value === "string") return value;

  return value ? "SI" : "NO";
};

const getBar = async (_, id) => {
  const apiUrl = `${environment.apiUrl}/${id}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
