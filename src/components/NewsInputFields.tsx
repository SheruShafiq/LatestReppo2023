import {
  Box,
  Button,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import GrowBox from "./GrowBox";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { dataProps } from "@/pages/NewsAdmin";

export type NewsInputFieldsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
};
const NewsInputFields = ({ setOpen, data, setData }: NewsInputFieldsProps) => {
  console.log(data);
  const [loading, setLoading] = React.useState(false);
  const service = new AerService(AerClient);
  const handleFormSubmit = async () => {
    if (setLoading) setLoading(true);

    try {
      await service.postNewsData(data); // Send the data to the API
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      // You might want to show an error message to the user here.
    } finally {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        setData({
          title: "",
          content: "",
          link: "",
          public: false,
        });
      }, 2000);
    }
  };

  return (
    <>
      <Stack gap={"1.5rem"}>
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
        >
          <Stack>
            <Typography
              color={"#6C737F"}
              sx={{
                fontColor: "#6C737F",
              }}
              variant={"subtitle1"}
            >
              Notificaties nieuwsberichten
            </Typography>
            <Typography
              color={"#6C737F"}
              fontSize={"0.75rem"}
              sx={{
                fontColor: "#6C737F",
              }}
              variant={"subtitle1"}
            >
              Wilt u de nieuwsberichten openbaar maken?
            </Typography>
          </Stack>
          <Switch
            onChange={(e) => {
              setData({ ...data, public: e.target.checked });
            }}
            checked={data.public}
            sx={{
              mt: 2,
            }}
          ></Switch>
        </Box>
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
        <TextField
          onChange={(e) => {
            setData({ ...data, link: e.target.value });
          }}
          value={data.link}
          sx={{
            fontColor: "#6C737F",
          }}
          size="small"
          label="Link"
        ></TextField>
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
          onClick={() => {}}
        >
          Nieuwsbericht verwijderen
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

export default NewsInputFields;
