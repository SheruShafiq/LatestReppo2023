import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import { DateTimePicker } from "@mui/x-date-pickers";
import GrowBox from "./GrowBox";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { dataProps } from "@/pages/NewsAdmin";

export type NotificationInputFieldsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};
const NotificationInputFields = ({
  setOpen,
  data,
  setData,
}: NotificationInputFieldsProps) => {
  const [loading, setLoading] = React.useState(false);
  const service = new AerService(AerClient);
  const handleFormSubmit = async () => {
    if (setLoading) setLoading(true);

    try {
      await service.postNewAnouncment(data); // Send the data to the API
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      // You might want to show an error message to the user here.
    } finally {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        setData({
          level: "",
          title: "",
          content: "",
          show_after: "",
          show_till: "",
        });
      }, 2000);
    }
  };
  console.log(new Date(data.show_till.toString()));

  return (
    <>
      <Stack gap={"1rem"}>
        <Stack>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Level</FormLabel>
            <RadioGroup
              onChange={(e) => {
                setData({ ...data, level: e.target.value });
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Info"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Info"
                control={<Radio size="small" />}
                label={<Typography fontSize={"1rem"}>Info</Typography>}
              />
              <FormControlLabel
                sx={{
                  mt: "-0.5rem",
                  "&.MuiFormControlLabel-label": {
                    fontSize: "4px",
                  },
                }}
                value="Warning"
                control={<Radio size="small" />}
                label={<Typography fontSize={"1rem"}>Warning</Typography>}
              />
              <FormControlLabel
                sx={{
                  mt: "-0.5rem",
                }}
                value="Error"
                control={<Radio size="small" />}
                label={<Typography fontSize={"1rem"}>Tip</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <TextField
          sx={{
            fontColor: "#6C737F",
          }}
          size="small"
          label="Title"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        ></TextField>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        ></Box>
        <TextField
          sx={{
            fontColor: "#6C737F",
          }}
          size="small"
          multiline
          rows={4}
          label="Content"
          value={data.content}
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
        ></TextField>
        <Stack>
          <Typography mb={"1rem"} color={"#6C737F"}>
            Tijdstip
          </Typography>
          <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
            <DateTimePicker
              value={new Date(data?.show_after.toString())}
              sx={{
                maxWidth: { xs: "98.5%", md: "15.25rem" },
                minWidth: "6.125rem",
                marginTop: "-1.5rem",
                pb: "1.5rem",
                "& .MuiInputBase-input": {
                  py: "0.53rem",
                },
                "& .MuiFormLabel-root": {
                  position: "relative",
                  top: "1rem",
                },
              }}
              label={"van"}
              onChange={(e) => {
                setData({ ...data, show_after: e });
              }}
            />
            <DateTimePicker
              value={new Date(data?.show_till.toString())}
              format="dd/MM/yyyy HH:mm"
              sx={{
                maxWidth: { xs: "98.5%", md: "15.25rem" },
                minWidth: "6.125rem",
                marginTop: "-1.5rem",
                pb: "1.5rem",
                "& .MuiInputBase-input": {
                  py: "0.53rem",
                },
                "& .MuiFormLabel-root": {
                  position: "relative",
                  top: "1rem",
                },
              }}
              label={"tot"}
              onChange={(e) => {
                setData({ ...data, show_till: e });
                console.log(e);
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <GrowBox />

      <Stack flexDirection={"row"} alignSelf={"flex-end"} mb={"1rem"}>
        <Button
          color="inherit"
          sx={{
            height: "2rem",
            width: { xs: "22rem", sm: "18rem" },
            mr: { xs: 0, sm: "2rem" },
            pb: { xs: "2rem", sm: "0.3rem" },
          }}
          onClick={() => {
            try {
              service.deleteAnouncment(data.id); // Send the data to the API
            } catch (error) {
              console.error("Error occurred while submitting the form:", error);
              // You might want to show an error message to the user here.
            }
          }}
        >
          Melding verwijderen
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
          }}
        >
          Anuleren
        </Button>
        <LoadingButton
          variant="contained"
          sx={{ width: { xs: "100%", sm: "8rem" }, height: "2rem" }}
          loading={loading}
          disabled={false}
          onClick={handleFormSubmit}
        >
          Opslaan
        </LoadingButton>
      </Stack>
    </>
  );
};

export default NotificationInputFields;
