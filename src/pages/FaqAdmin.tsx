import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ListItem, { ListItemProps } from "@/components/ListItem";
import React, { useState } from "react";

import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import DocumentInputField from "@/components/DocumentInputField";
import DrawerComponent from "@/components/DrawerComponent";
import FAQInputField from "@/components/FAQInputfield";
import FaqListItem from "@/components/FAQListItem";
import GrowBox from "@/components/GrowBox";
import LoadingButton from "@mui/lab/LoadingButton";
import NewsInputFields from "@/components/NewsInputFields";
import NotificationInputFields from "@/components/NotificationInputFields";
import PageHeadingComponent from "@/components/PageHeadingComponent";
import { set } from "date-fns";
import useAPI from "@/lib/hooks/useAPI";
import usePublicData from "@/lib/hooks/useAPI";

type dataProps = {
  question: string;
  answer: string;
};

const FaqAdmin = () => {
  const faqs = useAPI("/api/faqs/login");
  const [data, setData] = React.useState({
    question: "",
    answer: "",
  } as dataProps);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  console.log(faqs);
  const [SelectedmenuItem, setSelectedMenuItem] = React.useState("Login");
  const menuItems = [
    { value: 10, label: "Login" },
    { value: 20, label: "Portfolio" },
    { value: 30, label: "Instelligen" },
    { value: 40, label: "Documenten Beheer" },
    { value: 50, label: "Documenten (Gebruiker)" },
    { value: 60, label: "Gebruikers Beheer" },
    { value: 70, label: "Fouten Log" },
    { value: 80, label: "Meldingen beheer" },
    { value: 90, label: "Nieuws beheer" },
  ];

  return (
    <>
      <Stack id={"topSection"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <PageHeadingComponent subtitle={"Kennisbeheer"} title={"FAQs"} />
          <Button
            variant="outlined"
            sx={{
              width: "16rem",
              mt: 2.5,
              height: "2rem",
              color: "#3C4653",
              borderColor: "#3C4653",
            }}
            onClick={() => {
              setOpen(!open);
              setTitle("Aanmaken FAQ");
            }}
          >
            FAQ TOEVOEGEN
          </Button>
        </Stack>
        <Divider />
      </Stack>
      <Stack id={"pageContent"} mt={"1rem"}>
        {faqs?.map((item) => (
          <>
            <FaqListItem
              dropDownMenuProps={menuItems}
              icon={false}
              key={item?.question}
              title={item?.question}
              content={item?.answer}
              onClick={() => {
                setOpen(!open);
                setTitle("Aanpassen FAQ");
                setData({
                  question: item?.question,
                  answer: item?.answer,
                });
              }}
            />
            <Divider />
          </>
        ))}
      </Stack>
      <DrawerComponent
        width={17.125}
        open={open}
        setOpen={() => {
          setOpen(!open);
          setData({
            question: "",
            answer: "",
          });
        }}
        title={title}
        children={
          <FAQInputField
            data={data}
            setData={setData}
            setOpen={setOpen}
            menuItems={menuItems}
          />
        }
      />
    </>
  );
};

export default FaqAdmin;
