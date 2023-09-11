import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import GrowBox from "./GrowBox";
import { LoadingButton } from "@mui/lab";

export type FAQInputfieldProps = {
  data: any;
  setData: any;
  setOpen: any;
  menuItems: any;
};

const FAQInputField = ({
  data,
  setData,
  setOpen,
  menuItems,
}: FAQInputfieldProps) => {
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
          question: "",
          answer: "",
        });
      }, 2000);
    }
  };

  const service = new AerService(AerClient);
  return (
    <>
      <Stack gap={"1rem"}>
        <TextField
          value={data?.question}
          label="Vraag"
          size="small"
        ></TextField>
        <TextField
          value={data?.answer}
          label="Antwoord"
          size="small"
          multiline
          rows={4}
        ></TextField>
        <Box width={"8.875rem"} mt={"1rem"}>
          <Select
            fullWidth
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            onChange={(e) => {
              setData({
                ...data,

                context: e.target.value as string,
              });
            }}
            value={data.context}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
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
          Vraag Verwijderen
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
              question: "",
              answer: "",
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
          disabled={false}
        >
          Opslaan
        </LoadingButton>
      </Stack>
    </>
  );
};

export default FAQInputField;
