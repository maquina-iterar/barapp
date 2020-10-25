import { useEffect, useState } from "react";
import axios from "axios";

const useMyLocation = () => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fallbackByIp = async () => {
      const { data } = await axios.get("https://ipinfo.io/json");

      const current = data.loc.split(",");

      setLocation(current);
    };

    const getLocation = async () => {
      const current = await getCurrentLocation();

      setLocation(current);
    };

    const getSomeLocation = async () => {
      if (navigator.permissions) {
        const { state } = await navigator.permissions.query({
          name: "geolocation",
        });

        if (["granted", "prompt"].includes(state)) {
          getLocation();
          return;
        }
      }

      fallbackByIp();
    };

    getSomeLocation();
  }, []);

  return location;
};

export default useMyLocation;

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = ({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      };

      const error = (err) => {
        reject(err);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      reject(new Error("geolocation no available"));
    }
  });
};
