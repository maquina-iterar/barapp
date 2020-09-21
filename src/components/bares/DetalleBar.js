import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Layout from "../Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery, useMutation, queryCache } from "react-query";
import { useParams } from "react-router-dom";
import LikeIcon from "@material-ui/icons/ThumbUp";
import DislikeIcon from "@material-ui/icons/ThumbDown";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonWithAuthPopup from "./ButtonWithAuthPopup";
import Rating from "@material-ui/lab/Rating";
import MobileStepper from "@material-ui/core/MobileStepper";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Lightbox from "react-image-lightbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 240,
    [theme.breakpoints.down("xs")]: {
      height: 200,
    },
  },
}));

const caracteriscasLabels = {
  opcionVegetariana: () => "Tiene opción vegetariana",
  musiscaEnVivo: () => "Tiene música en vivo",
  espacioAlAireLibre: (value) => `Tiene espacio ${value}`,
};

const queryBarDetails = "bar";
const STARS_NUMBER = 5;

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
    meGusta = 0,
    noMeGusta = 0,
    nombre,
    galeria,
    descripcion,
    direccion,
    pais,
    contactos,
    caracteristicas,
    ubicacionUrl,
  } = bar;

  const [activeStep, setActiveStep] = useState(0);
  const [galeriaOpened, setGaleriaOpened] = useState(false);
  const maxSteps = galeria ? galeria.length : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % galeria.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep + galeria.length - 1) % galeria.length
    );
  };

  const votantesCount = meGusta + noMeGusta;

  const rating =
    votantesCount > 0 ? (meGusta / votantesCount) * STARS_NUMBER : -1;

  return (
    <Layout backUrl="/">
      <Card className={classes.root}>
        {galeriaOpened && (
          <Lightbox
            mainSrc={galeria[activeStep]}
            nextSrc={galeria[(activeStep + 1) % galeria.length]}
            prevSrc={
              galeria[(activeStep + galeria.length - 1) % galeria.length]
            }
            enableZoom={false}
            onCloseRequest={() => setGaleriaOpened(false)}
            onMovePrevRequest={handleBack}
            onMoveNextRequest={handleNext}
          />
        )}
        <CardActionArea onClick={() => setGaleriaOpened(true)}>
          <CardMedia
            className={classes.media}
            image={galeria && galeria[activeStep]}
            title={nombre}
          />
        </CardActionArea>

        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Siguiente
              <ArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <ArrowLeft />
              Anterior
            </Button>
          }
        />
        <CardContent
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {rating !== -1 && <Rating value={rating} readOnly />}
            {rating === -1 && (
              <Typography color="textSecondary" variant={"subtitle1"}>
                Todavia nadie votó, sé el primero!!
              </Typography>
            )}
            <div style={{ display: "flex" }}>
              <ButtonWithAuthPopup
                color="primary"
                disabled={["success", "loading"].includes(valoracionStatus)}
                onClick={() => mutateValoracion({ id, valoracion: "megusta" })}
              >
                <LikeIcon />
              </ButtonWithAuthPopup>
              <Divider
                orientation="vertical"
                flexItem
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              <ButtonWithAuthPopup
                disabled={["success", "loading"].includes(valoracionStatus)}
                onClick={() =>
                  mutateValoracion({ id, valoracion: "nomegusta" })
                }
                color="secondary"
              >
                <DislikeIcon />
              </ButtonWithAuthPopup>
            </div>
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
  const apiUrl = `${environment.apiUrl}/bares/${id}`;

  const { data } = await axios.get(apiUrl);

  return data;
};

const postValoracion = async ({ id, valoracion }) => {
  const apiUrl = `${environment.apiUrl}/bares/${id}/${valoracion}`;

  return await axios.post(apiUrl);
};
