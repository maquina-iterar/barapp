import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Layout from "../Layout";
import environment from "../../environment";
import axios from "axios";
import { useMutation, QueryStatus } from "react-query";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Joi from "@hapi/joi";

const schema = Joi.object({
  nombre: Joi.string().trim().min(3).max(50).required(),
  fotoUrl: Joi.string().uri().trim().required(),
  ubicacionUrl: Joi.string().trim().uri().required(),
  descripcion: Joi.string().trim(),
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 20,
  },
  media: {
    height: 140,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

const EditarBar = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const [mutate, { status }] = useMutation(postBar);

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value;

    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    setData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validation = schema.validate(data, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.reduce((acc, current) => {
        return {
          ...acc,
          [current.context.key]: current.message,
        };
      }, {});

      setErrors(errors);

      return;
    }

    mutate({ data });

    const limpio = Object.keys(data).reduce((acc, current) => {
      return {
        ...acc,
        [current]: "",
      };
    }, {});

    setData(limpio);
  };

  return (
    <Layout backUrl="/">
      <Paper className={classes.root} elevation={3}>
        <div onSubmit={handleSubmit} className={classes.form}>
          <Typography component={"h2"} variant="h4">
            Nuevo Bar
          </Typography>

          <TextField
            name="nombre"
            value={data["nombre"]}
            onChange={handleChange("nombre")}
            error={errors["nombre"] ? true : false}
            helperText={errors["nombre"]}
            label="Nombre"
            variant="filled"
          />
          <TextField
            name="descripcion"
            value={data["descripcion"]}
            onChange={handleChange("descripcion")}
            error={errors["descripcion"] ? true : false}
            helperText={errors["descripcion"]}
            label="Descripción"
            variant="filled"
          />
          <TextField
            name="fotoUrl"
            value={data["fotoUrl"]}
            onChange={handleChange("fotoUrl")}
            error={errors["fotoUrl"] ? true : false}
            helperText={errors["fotoUrl"]}
            label="Foto (URL)"
            variant="filled"
          />
          <TextField
            name="ubicacionUrl"
            value={data["ubicacionUrl"]}
            onChange={handleChange("ubicacionUrl")}
            error={errors["ubicacionUrl"] ? true : false}
            helperText={errors["ubicacionUrl"]}
            label="Ubicación (URL)"
            variant="filled"
          />
          <Button
            disabled={status === QueryStatus.Loading}
            size="large"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </div>
      </Paper>
    </Layout>
  );
};

export default EditarBar;

const postBar = async ({ data }) => {
  const apiUrl = `${environment.apiUrl}/agregar`;

  await axios.post(apiUrl, data);
};
