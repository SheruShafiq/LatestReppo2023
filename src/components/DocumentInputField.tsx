import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import GrowBox from "./GrowBox";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import NavigationButtons from "./NavigationButtons";
import axios from "axios";
import { data } from "@/pages/DocumentsAdmin";

export type DocumentInputFieldProps = {
  data: data;
  setData: React.Dispatch<React.SetStateAction<data>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DocumentInputField({
  setOpen,
  data,
  setData,
}: DocumentInputFieldProps) {
  console.log(data);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (typeof reader.result === "string") {
          setData((prevState) => ({
            ...prevState,
            filename: file.name,
            file_type: file.type,
            file_contents: reader.result as string,
          }));
        }
      };
    }
  };
  const [error, setError] = useState<string | null>(null);
  const handleIconChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        const img = new Image();
        img.src = reader.result as string; // Set the source to the base64 representation

        img.onload = function () {
          if (img.width <= 200 && img.height <= 300) {
            // set the image's base64 string to state
            setData((prevState) => ({ ...prevState, icon: img.src }));
            setError(null); // Reset the error if the image is valid
          } else {
            setError(
              "Image dimensions exceed limits. Please select an image of 200x300 or smaller."
            );
          }
        };
      };

      reader.onerror = function (error) {
        console.error("Error loading the image file:", error);
      };
    }
  };

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    if (setLoading) setLoading(true);

    try {
      await service.postDocumentData(data); // Send the data to the API
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      // You might want to show an error message to the user here.
    } finally {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        setData({
          title: "",
          description: "",
          icon: "",
          filename: "",
          file_type: "",
          file_contents: "",
        });
      }, 2000);
    }
  };

  const service = new AerService(AerClient);

  return (
    <>
      <Stack gap={"1.5rem"}>
        <TextField
          label={"Naam"}
          name="title"
          value={data.title}
          onChange={handleInputChange}
          size="small"
        />
        <TextField
          label={"Beschriving"}
          name="description"
          value={data.description}
          onChange={handleInputChange}
          size="small"
          multiline
          rows={3}
        />

        <Typography color={"#6C737F"}>File (PDF)</Typography>
        <TextField
          multiline
          rows={3}
          value={data?.filename}
          name="file"
          onChange={handleFileChange}
          InputProps={{
            endAdornment: (
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  opacity: 0,
                }}
              />
            ),
          }}
        />
        <Typography color={"#6C737F"}>Icon</Typography>
        <TextField
          value={data.icon}
          sx={{
            borderStyle: "dashed",
          }}
          name="file"
          onChange={handleIconChange}
          InputProps={{
            endAdornment: (
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  opacity: 0,
                }}
              />
            ),
          }}
        />
        {data.icon && (
          <Box mt={1} alignSelf={"center"}>
            <img
              src={data.icon}
              alt="Icon Preview"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>
        )}

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Stack>
      <GrowBox />

      <Stack flexDirection={"row"} alignSelf={"flex-end"} mb={"1rem"}>
        <Button
          color="inherit"
          sx={{
            height: "2rem",
            width: { xs: "22rem", sm: "15rem" },
            mr: { xs: 0, sm: "2rem" },
            pb: { xs: "2rem", sm: "0.3rem" },
          }}
          onClick={() => {}}
        >
          Document verwijderen
        </Button>
        <Button
          color="inherit"
          sx={{
            width: { xs: "22rem", sm: "8.5rem" },
            mr: { xs: 0, sm: "2rem" },
            pb: { xs: "2rem", sm: "0.3rem" },
          }}
          onClick={() => {
            setOpen(false);
            setData({
              title: "",
              description: "",
              icon: "",
              filename: "",
              file_type: "",
              file_contents: "",
            });
          }}
        >
          Anuleren
        </Button>
        <LoadingButton
          variant="contained"
          sx={{ width: { xs: "100%", sm: "8rem" }, height: "2rem" }}
          onClick={handleFormSubmit}
          loading={loading}
          disabled={
            data.title === "" ||
            data.description === "" ||
            data.icon === "" ||
            data.filename === ""
          }
        >
          Opslaan
        </LoadingButton>
      </Stack>
    </>
  );
}

export default DocumentInputField;
