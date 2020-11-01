import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import environment from "environment";

const InputLocation = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const loading = open; // && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const action = async () => {
      const response = await fetch(
        `${environment.apiUrl}/cities?search=${search}`
      );
      const cities = await response.json();

      /*
        {
            "cityId":3039154,
            "name":"El Tarter",
            "altName":"",
            "country":"AD",
            "featureCode":"PPL",
            "adminCode":"02",
            "population":1052,
            "loc":
                {
                    "type":"Point",
                    "coordinates":[1.65362,42.57952]
                }
            }
        */
      if (active) {
        setOptions(
          cities.map(({ name, country, loc }) => ({
            name: `${name}, ${country}`,
            location: loc,
          }))
        );
      }
    };

    action();

    return () => {
      active = false;
    };
  }, [loading, search]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth={true}
      freeSolo
      autoSelect
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => {
        if (onChange) onChange(value);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={"Seleccioná una ciudad"}
          //label="Seleccioná una ciudad"
          onChange={(event) => setSearch(event.target.value)}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default InputLocation;
