import React from "react";
import Typography from "@material-ui/core/Typography";
import Location from "../../assets/icons/Location";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  position: {
    marginTop: 20,
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontWeight: 800,
    color: "#232326",
    borderBottom: "2px solid #232326",
    cursor: "pointer",
  },
});

const MiPosicion = () => {
  const classes = useStyles();

  return (
    <div className={classes.position}>
      <Location />
      <Typography
        variant={"h5"}
        className={classes.title}
      >
        Palermo
      </Typography>
    </div>
  );
};

export default MiPosicion;
