import { Button, Divider, Stack } from "@mui/material";
import ListItem, { ListItemProps } from "@/components/ListItem";

import DocumentInputField from "@/components/DocumentInputField";
import DrawerComponent from "@/components/DrawerComponent";
import NewsInputFields from "@/components/NewsInputFields";
import PageHeadingComponent from "@/components/PageHeadingComponent";
import React from "react";
import { set } from "date-fns";
import useAPI from "@/lib/hooks/useAPI";
import usePublicData from "@/lib/hooks/useAPI";

export type dataProps = {
  title: string;
  content: string;
  link: string;
  public: boolean;
};

const NewsAdmin = () => {
  const news = useAPI("/api/news");
  const [data, setData] = React.useState({
    title: "",
    content: "",
    link: "",
    public: false,
  } as dataProps);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  return (
    <>
      <Stack id={"topSection"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <PageHeadingComponent
            subtitle={"Nieuwsberichtenbeheer"}
            title={"Nieuwsberichten"}
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
              setTitle("Aanmaken Nieuwsbericht");
            }}
          >
            NIEUWSBERICHT TOEVOEGEN
          </Button>
        </Stack>
        <Divider />
      </Stack>
      <Stack id={"pageContent"} mt={"1rem"}>
        {news?.map((item) => (
          <>
            <ListItem
              icon={false}
              key={item.id}
              title={item.title}
              content={item.content}
              onClick={() => {
                setOpen(!open);
                setTitle("Aanpassen Nieuwsbericht");
                setData({
                  title: item.title,
                  content: item.content,
                  link: item.link,
                  public: item.public,
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
            title: "",
            content: "",
            link: "",
            public: false,
          });
        }}
        title={title}
        children={
          <NewsInputFields setOpen={setOpen} data={data} setData={setData} />
        }
      />
    </>
  );
};

export default NewsAdmin;
