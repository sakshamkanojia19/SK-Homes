import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import { useForm } from "@mantine/form"; // Keeping useForm as is

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <div style={{ maxWidth: "30%", margin: "auto", marginTop: "1rem", marginBottom: "1rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="bedrooms" style={{ display: "block", marginBottom: "0.5rem" }}>
            No of Bedrooms
            <span style={{ color: "red" }}> *</span>
          </label>
          <input
            id="bedrooms"
            type="number"
            min={0}
            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
            {...form.getInputProps("bedrooms")}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="parkings" style={{ display: "block", marginBottom: "0.5rem" }}>
            No of Parkings
          </label>
          <input
            id="parkings"
            type="number"
            min={0}
            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
            {...form.getInputProps("parkings")}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="bathrooms" style={{ display: "block", marginBottom: "0.5rem" }}>
            No of Bathrooms
            <span style={{ color: "red" }}> *</span>
          </label>
          <input
            id="bathrooms"
            type="number"
            min={0}
            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
            {...form.getInputProps("bathrooms")}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            type="button"
            onClick={prevStep}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "1rem",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: isLoading ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isLoading ? "Submitting" : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Facilities;
