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
import { withStyles } from "@material-ui/core/styles";
import Location from "../../assets/icons/Location";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 8,
  },
  media: {
    height: 240,
    [theme.breakpoints.down("xs")]: {
      height: 200,
    },
  },
  title: {
    flexGrow: 1,
    color: "#232326",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(28),
  },
  votos: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(16),
  },
  galeriaActions: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
  galeriaDot: {
    backgroundColor: "#fff",
  },
  galeriaDotActive: {
    backgroundColor: "#FEBA01",
    boxShadow: "0px 0px 40px -5px #212122",
  },
  direccion: {
    color: "#616166",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
  },
  direccion2: {
    color: "#616166",
    fontSize: theme.typography.pxToRem(14),
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
      <div style={{ paddingBottom: 25 }}>
        <Typography variant="h6" className={classes.title}>
          {nombre}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {rating !== -1 && <StyledRating value={rating} readOnly />}
          {rating === -1 && (
            <Typography color="textSecondary" variant={"subtitle1"}>
              Todavia nadie votó, sé el primero!!
            </Typography>
          )}
          {rating !== -1 && (
            <Typography
              variant="caption"
              className={classes.votos}
            >{`${votantesCount} votos`}</Typography>
          )}
        </div>
      </div>
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
        <div style={{ position: "relative" }}>
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
            classes={{
              dot: classes.galeriaDot,
              dotActive: classes.galeriaDotActive,
              root: classes.galeriaActions,
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                <ArrowRight style={{ color: "#fff" }} />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <ArrowLeft style={{ color: "#fff" }} />
              </Button>
            }
          />
        </div>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontWeight: "bold" }}
              >
                {nombre}
              </Typography>
              <div style={{ display: "flex", alignSelf: "flex-start" }}>
                <ButtonWithAuthPopup
                  color="secondary"
                  disabled={["success", "loading"].includes(valoracionStatus)}
                  onClick={() =>
                    mutateValoracion({ id, valoracion: "megusta" })
                  }
                >
                  <LikeIcon />
                </ButtonWithAuthPopup>
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
          </div>
          <div>
            <Typography variant="body2" color="textSecondary" component="p">
              {descripcion}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <Location secondary />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a
                href={ubicacionUrl}
                rel="noopener noreferrer"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="span"
                  className={classes.direccion}
                >
                  {direccion}
                </Typography>
              </a>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="span"
                className={classes.direccion2}
              >
                {pais}
              </Typography>
            </div>
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

const StyledRating = withStyles({
  iconFilled: {
    color: "#0D1C2E",
  },
  iconEmpty: {
    color: "#0D1C2E50",
  },
})(Rating);

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
