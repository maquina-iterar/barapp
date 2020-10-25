import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Location from "assets/icons/Location";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useQuery } from "react-query";
import environment from "environment";

const useStyles = makeStyles({
  position: {
    marginTop: 20,
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: 800,
    color: "#232326",
    borderBottom: "2px solid #232326",
    cursor: "pointer",
  },
});

const MiPosicion = ({ value }) => {
  const classes = useStyles();

  const { data: city } = useQuery(["myLocation", value], getMyLocation, {
    enabled: value && value.length === 2,
  });

  return (
    <div className={classes.position}>
      <Location />
      <Typography variant={"h5"} className={classes.title}>
        {city ? `${city.name}, ${city.country}` : "-"}
      </Typography>
    </div>
  );
};

export default MiPosicion;

const getMyLocation = async (_, [latitude, longitude]) => {
  const apiUrl = `${environment.apiUrl}/cities/location?latitude=${latitude}&longitude=${longitude}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
