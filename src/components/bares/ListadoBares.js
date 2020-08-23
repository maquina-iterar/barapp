import React from "react";
import Bar from "./Bar";
import BarLoading from "./BarLoading";
import Layout from "../../components/Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery } from "react-query";

const ListadoBares = () => {
  const { isLoading, data: bares, error } = useQuery("bares", getBares);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
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

const getBares = async () => {
  const apiUrl = environment.apiUrl;

  const { data } = await axios.get(apiUrl);

  return data;
};
