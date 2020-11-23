import { useState, useEffect } from "react";

const useMyLocation = () => {
  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState(null);

  const getLocation = async () => {
    const current = await getCurrentLocation();

    setLocation(current);
  };

  return [selected ? selected : location, setSelected, getLocation];
};

export default useMyLocation;

export const permissionOptions = {
  loading: "loading",
  granted: "granted",
  prompt: "prompt",
  denied: "denied",
};

export const useLocationPermission = () => {
  const [state, setState] = useState(permissionOptions.loading);

  useEffect(() => {
    const getPermission = async () => {
      if (navigator.permissions) {
        const { state } = await navigator.permissions.query({
          name: "geolocation",
        });

        setState(state);
      }
    };

    getPermission();
  }, [setState]);

  return state;
};

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
