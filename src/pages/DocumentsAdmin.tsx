import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DocumentListItem, { ListItemProps } from "@/components/ListItem";
import { PageData, setRecentlyViewed } from "@/lib/redux/slices/layoutSlice";
import React, { useEffect, useState } from "react";

import DocumentInputField from "@/components/DocumentInputField";
import DrawerComponent from "@/components/DrawerComponent";
import { Edit } from "@mui/icons-material";
import FilePreview from "@/components/FilePreview";
import GrowBox from "@/components/GrowBox";
import NavigationButtons from "@/components/NavigationButtons";
import PageHeadingComponent from "@/components/PageHeadingComponent";
import Unauthorized from "./Unauthorized";
import { id } from "date-fns/locale";
import { selectSessionPermissions } from "@/lib/redux/slices/sessionSlice";
import useAPI from "@/lib/hooks/useAPI";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";

export type data = {
  title: string;
  description: string;
  icon: string;
  filename: string;
  file_type: string;
  file_contents: string;
};
const AdminDocument = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    icon: "",
    filename: "",
    file_type: "",
    file_contents: "",
  });
  const [drawerTitle, setDrawerTitle] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [currentPageData, setCurrentPageData] = useState<PageData>();
  useEffect(() => {
    setCurrentPageData({
      heading: "Documenten",
      subHeading: [`Marketing ondersteuning`],
      url: `/documents`,
    });
  }, [id]);

  useEffect(() => {
    if (currentPageData) {
      dispatch(setRecentlyViewed(currentPageData));
    }
  }, [currentPageData]);

  const permission = useAppSelector(selectSessionPermissions);
  if (!permission.includes("documents-management")) {
    <Unauthorized />;
  }
  const documents: any = useAPI("/api/documents");
  const [loading, setLoading] = useState(true);
  console.log(documents);
  useEffect(() => {
    if (documents) {
      setLoading(false);
    }
  }, [documents]);
  const transformDocuments = (documents: any[]) => {
    return documents.map((doc) => ({
      key: doc.id,
      id: doc.id,
      title: doc.title,
      content: doc.description,
      image: doc.icon,
      onClick: () => {
        setData({
          title: doc.title,
          description: doc.description,
          icon: doc.icon,
          filename: doc.filename,
          file_type: doc.file_type,
          file_contents: doc.file_contents,
        });
        setDrawerTitle("Aanpassen Document");
        setOpen(true);
        setTitle(doc.id);
      },
    }));
  };
  const DocumentListItems: ListItemProps[] = !loading
    ? transformDocuments(documents)
    : [];

  return (
    <>
      <Stack id={"topSection"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <PageHeadingComponent
            subtitle={"Documentenbeheer"}
            title={"Documenten"}
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
              setData({
                title: "",
                description: "",
                icon: "",
                filename: "",
                file_type: "",
                file_contents: "",
              });
              setOpen(true);
              setDrawerTitle("Aanmaken Document");
            }}
          >
            DOCUMENT TOEVOEGEN
          </Button>
        </Stack>
        <Divider />
      </Stack>
      <Stack id={"pageContent"} mt={"1rem"}>
        {DocumentListItems.map((item, index) => (
          <>
            <DocumentListItem
              icon={true}
              key={item.id}
              title={item.title}
              content={item.content}
              onClick={item.onClick}
              image={item.image}
            />
            <Divider />
          </>
        ))}
      </Stack>
      <DrawerComponent
        width={17.125}
        open={open}
        setOpen={setOpen}
        title={drawerTitle}
        children={
          <DocumentInputField setOpen={setOpen} data={data} setData={setData} />
        }
      />
    </>
  );
};
export default AdminDocument;
