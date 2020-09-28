import React from "react";
import Typography from "@material-ui/core/Typography";
import Location from "../../assets/icons/Location";

const MiPosicion = () => {
  return (
    <div
      style={{ alignSelf: "flex-start", display: "flex", alignItems: "center" }}
    >
      <Location />
      <Typography
        variant={"h5"}
        style={{
          fontWeight: 800,
          color: "#232326",
          borderBottom: "2px solid #232326",
          cursor: "pointer",
        }}
      >
        Palermo
      </Typography>
    </div>
  );
};

export default MiPosicion;
