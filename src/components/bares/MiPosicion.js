import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Location from "assets/icons/Location";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useQuery } from "react-query";
import environment from "environment";
import InputLocation from "./InputLocation";
import Link from "@material-ui/core/Link";
import {
  useLocationPermission,
  permissionOptions,
} from "components/bares/useMyLocation";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import LocationIlu from "assets/ilustraciones/Location";

const useStyles = makeStyles({
  position: {
    marginTop: 20,
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: 800,
    color: "#232326",
    borderBottom: "2px solid #232326",
    cursor: "pointer",
  },
});

const MiPosicion = ({ value, onLocationEnable, onChange }) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);

  const { data: city } = useQuery(["myLocation", value], getMyLocation, {
    enabled: value && value.length === 2,
  });

  const locationPermission = useLocationPermission();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (locationPermission === permissionOptions.prompt) {
      setOpen(true);
    }
    if (locationPermission === permissionOptions.granted && onLocationEnable) {
      onLocationEnable();
    }
  }, [locationPermission, onLocationEnable]);

  return (
    <div className={classes.position}>
      <Location />
      {!editing && (
        <Link component="button" onClick={() => setEditing(true)}>
          <Typography variant={"h5"} className={classes.title}>
            {city
              ? `${city.name}, ${city.country}`
              : "Seleccioná una ubicación"}
          </Typography>
        </Link>
      )}
      {editing && (
        <div style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }}>
          <InputLocation
            onChange={(value) => {
              setEditing(false);
              console.log(value);
              if (onChange) onChange(value);
            }}
          />
        </div>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="permission-popup-dialog"
      >
        <DialogContent
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div style={{ textAlign: "center", padding: 20, paddingBottom: 0 }}>
            <LocationIlu style={{ height: 180, width: 200 }} />
          </div>
          <DialogTitle
            id="permission-popup-dialog"
            style={{ textAlign: "center" }}
          >
            Encontrá bares cerca tuyo
          </DialogTitle>
          <DialogContentText>
            Para ver los bares que están cerca tuyo <br />
            te vamos a pedir permiso para ver tu ubicación.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="secondary"
            variant={"outlined"}
            style={{ width: 220, height: fullScreen ? 60 : "auto" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              if (onLocationEnable) {
                onLocationEnable();
              }
            }}
            variant={"contained"}
            color="primary"
            autoFocus
            style={{ width: 220, height: fullScreen ? 60 : "auto" }}
          >
            Habilitar mi ubicación
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MiPosicion;

const getMyLocation = async (_, [latitude, longitude]) => {
  const apiUrl = `${environment.apiUrl}/cities/location?latitude=${latitude}&longitude=${longitude}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
