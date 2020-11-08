import React, { useState } from "react";
import Bar from "./Bar";
import BarLoading from "./BarLoading";
import Layout from "../../components/Layout";
import environment from "../../environment";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import MiPosicion from "./MiPosicion";
import useMyLocation from "./useMyLocation";
import InfiniteScroll from "react-infinite-scroll-component";

const ListadoBares = () => {
  const [location, setSelected, getLocation] = useMyLocation();

  const {
    status,
    data,
    isFetching,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["bares", location], getBares, {
    getFetchMore: (lastGroup, allGroups) => lastGroup.nextCursor,
  });

  const isLoading = status === "loading";

  const bares = data ? data.flatMap((bares) => bares) : [];

  console.log("bares", bares);

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
          onLocationEnable={() => getLocation()}
          onChange={(value) => {
            setSelected(
              value && value.location && value.location.coordinates
                ? value.location.coordinates.reverse()
                : null
            );
          }}
        />
        <InfiniteScroll
          dataLength={bares ? bares.length : 0} //This is important field to render the next data
          next={() => fetchMore(bares.length)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          //refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          // }
        >
          {bares &&
            bares.map((bar) => <Bar key={`bar-${bar._id}`} value={bar} />)}
        </InfiniteScroll>

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

const getBares = async (_, [latitude, longitude], cursor = 0) => {
  console.log("cursor", cursor);

  const apiUrl = `${environment.apiUrl}/bares?latitude=${latitude}&longitude=${longitude}&skip=${cursor}`;

  const { data } = await axios.get(apiUrl);

  return data;
};
