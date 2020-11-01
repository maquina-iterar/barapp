import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Location from "assets/icons/Location";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useQuery } from "react-query";
import environment from "environment";
import InputLocation from "./InputLocation";
import Link from "@material-ui/core/Link";

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

const MiPosicion = ({ value, onChange }) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);

  const { data: city } = useQuery(["myLocation", value], getMyLocation, {
    enabled: value && value.length === 2,
  });

  return (
    <div className={classes.position}>
      <Location />
      {!editing && (
        <Link component="button" onClick={() => setEditing(true)}>
          <Typography variant={"h5"} className={classes.title}>
            {city ? `${city.name}, ${city.country}` : "-"}
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
    </div>
  );
};

export default MiPosicion;

const getMyLocation = async (_, [latitude, longitude]) => {
  const apiUrl = `${environment.apiUrl}/cities/location?latitude=${latitude}&longitude=${longitude}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
