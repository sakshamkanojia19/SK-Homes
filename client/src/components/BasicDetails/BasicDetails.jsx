import React from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
    }
  });

  const onSubmit = (data) => {
    setPropertyDetails((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
    <Box sx={{ maxWidth: '50%', mx: 'auto', my: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Title"
          placeholder="Property Name"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          placeholder="Description"
          multiline
          rows={4}
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          placeholder="1000"
          type="number"
          {...register("price", { 
            required: "Price is required",
            validate: value => value >= 1000 || "Must be greater than 999 dollars"
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          margin="normal"
        />

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" onClick={prevStep}>
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Next Step
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BasicDetails;;
