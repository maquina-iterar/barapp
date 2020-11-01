import React from "react";
import Bar from "./Bar";
import BarLoading from "./BarLoading";
import Layout from "../../components/Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery } from "react-query";
import MiPosicion from "./MiPosicion";
import useMyLocation from "./useMyLocation";

const ListadoBares = () => {
  const [location, setSelected] = useMyLocation();

  const { isLoading, data: bares, error } = useQuery(
    ["bares", location],
    getBares,
    {
      enabled: location && location.length === 2,
    }
  );

  return (
    <Layout title={"Barapp"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <MiPosicion
          value={location}
          onChange={(value) => {
            setSelected(
              value && value.location && value.location.coordinates
                ? value.location.coordinates.reverse()
                : null
            );
          }}
        />

        {bares &&
          bares.map((bar) => <Bar key={`bar-${bar._id}`} value={bar} />)}

        {isLoading && (
          <>
            <BarLoading />
            <BarLoading />
            <BarLoading />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ListadoBares;

const getBares = async (_, [latitude, longitude]) => {
  const apiUrl = `${environment.apiUrl}/bares?latitude=${latitude}&longitude=${longitude}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
