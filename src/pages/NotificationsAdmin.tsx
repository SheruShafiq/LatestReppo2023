import { Button, Divider, Stack } from "@mui/material";
import ListItem, { ListItemProps } from "@/components/ListItem";

import DocumentInputField from "@/components/DocumentInputField";
import DrawerComponent from "@/components/DrawerComponent";
import NewsInputFields from "@/components/NewsInputFields";
import NotificationInputFields from "@/components/NotificationInputFields";
import PageHeadingComponent from "@/components/PageHeadingComponent";
import React from "react";
import { set } from "date-fns";
import useAPI from "@/lib/hooks/useAPI";
import usePublicData from "@/lib/hooks/useAPI";

const NewsAdmin = () => {
  const announcements = useAPI("/api/announcements");
  const [data, setData] = React.useState({
    id: "",
    level: "",
    title: "",
    content: "",
    show_after: "",
    show_till: "",
  });
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  return (
    <>
      <Stack id={"topSection"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <PageHeadingComponent
            subtitle={"Meldingenbeheer"}
            title={"Meldingen"}
          />
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
              setTitle("Aanmaken Melding");
            }}
          >
            MELDING TOEVOEGEN
          </Button>
        </Stack>
        <Divider />
      </Stack>
      <Stack id={"pageContent"} mt={"1rem"}>
        {announcements?.map((item) => (
          <>
            <ListItem
              icon={false}
              key={item?.id}
              title={item?.title}
              content={item?.content}
              onClick={() => {
                setOpen(!open);
                setTitle("Aanpassen Melding");
                setData({
                  id: item?.id,
                  level: item?.level,
                  title: item?.title,
                  content: item?.content,
                  show_after: item?.show_after,
                  show_till: item?.show_till,
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
            id: "",
            level: "",
            title: "",
            content: "",
            show_after: "",
            show_till: "",
          });
        }}
        title={title}
        children={
          <NotificationInputFields
            setOpen={setOpen}
            data={data}
            setData={setData}
          />
        }
      />
    </>
  );
};

export default NewsAdmin;
