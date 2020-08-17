import React, { useEffect, useState } from "react";
import Bar from "./Bar";

const ListadoBares = () => {
  const [bares, setBares] = useState([]);

  useEffect(() => {
    const action = async () => {
      const bares = await getBares();
      setBares(bares);
    };

    action();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {bares.map((bar) => (
        <Bar
          key={`bar-${bar._id}`}
          nombre={bar.nombre}
          descripcion={bar.descripcion}
          fotoUrl={bar.fotoUrl}
          ubicacionUrl={bar.ubicacionUrl}
        />
      ))}
    </div>
  );
};

export default ListadoBares;

const getBares = async () => {
  const api = "http://localhost:5000/api/v1/bares";

  const bares = await fetch(api).then((response) => response.json());

  console.log("bares", bares);

  return bares;
};
