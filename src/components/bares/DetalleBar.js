import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery, useMutation, queryCache } from "react-query";
import { useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import LikeIcon from "@material-ui/icons/ThumbUp";
import DislikeIcon from "@material-ui/icons/ThumbDown";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
  },
});

const caracteriscasLabels = {
  opcionVegetariana: () => "Tiene opción vegetariana",
  musiscaEnVivo: () => "Tiene música en vivo",
  espacioAlAireLibre: (value) => `Tiene espacio ${value}`,
};

const queryBarDetails = "bar";

const DetalleBar = () => {
  const classes = useStyles();

  const { id } = useParams();

  const { isLoading, data: bar = {}, error } = useQuery(
    [queryBarDetails, id],
    getBar
  );

  const [
    mutateValoracion,
    { status: valoracionStatus, error: valoracionError },
  ] = useMutation(postValoracion, {
    onSuccess: () => {
      queryCache.invalidateQueries(queryBarDetails);
    },
  });

  const {
    meGusta,
    noMeGusta,
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
        <CardContent
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              disabled={["success", "loading"].includes(valoracionStatus)}
              onClick={() => mutateValoracion({ id, valoracion: "megusta" })}
            >
              <LikeIcon />
            </IconButton>
            <Typography variant="h6" component="h6">
              {meGusta}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginLeft: 10, marginRight: 10 }}
            />
            <Typography variant="h6" component="h6">
              {noMeGusta}
            </Typography>
            <IconButton
              disabled={["success", "loading"].includes(valoracionStatus)}
              onClick={() => mutateValoracion({ id, valoracion: "nomegusta" })}
              color="secondary"
            >
              <DislikeIcon />
            </IconButton>
          </div>
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              {nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {descripcion}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
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
          <div>
            <Typography gutterBottom variant="h5" component="span">
              Características
            </Typography>
            {caracteristicas &&
              Object.keys(caracteristicas).map((key) => (
                <React.Fragment key={`caracteristica-${key}`}>
                  {caracteristicas[key] && (
                    <div style={{ display: "flex", gap: "20px", marginTop: 5 }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="span"
                      >
                        {caracteriscasLabels[key](caracteristicas[key])}
                      </Typography>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
          <div>
            <Typography gutterBottom variant="h5" component="span">
              Contactos
            </Typography>
            {contactos &&
              contactos.map((contacto, index) => (
                <div
                  key={`contacto-${index}`}
                  style={{ display: "flex", gap: "20px", marginTop: 5 }}
                >
                  <a
                    href={contacto.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="span"
                    >
                      {formatRedSocial(contacto)}
                    </Typography>
                  </a>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DetalleBar;

const formatRedSocial = ({ redSocial, link }) => {
  if (redSocial === "instagram") {
    const linkArr = link.split("/");

    return `@${linkArr[linkArr.length - 1]}`;
  }

  return redSocial;
};

const getBar = async (_, id) => {
  const apiUrl = `${environment.apiUrl}/${id}`;

  const { data } = await axios.get(apiUrl);

  return data;
};

const postValoracion = async ({ id, valoracion }) => {
  const apiUrl = `${environment.apiUrl}/${id}/${valoracion}`;

  return await axios.post(apiUrl);
};
