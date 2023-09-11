import { Divider, Stack } from "@mui/material";
import DocumentListItem, { DocumentListItemProps } from "@/components/ListItem";
import { PageData, setRecentlyViewed } from "@/lib/redux/slices/layoutSlice";
import React, { useEffect, useState } from "react";

import DrawerComponent from "@/components/DrawerComponent";
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

const Documents = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");
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
  const documents: any = useAPI("/api/documents");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (documents) {
      setLoading(false);
    }
  }, [documents]);

  const transformDocuments = (documents: any[]) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    return documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      content: doc.description,
      image: doc.icon,
      onClick: () => {
        setOpen(true);
        setTitle(doc.title);
        setSelectedDocumentId(doc.id);
      },
    }));
  };

  const DocumentListItems: DocumentListItemProps[] = !loading
    ? transformDocuments(documents)
    : [];
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const url = window.URL.createObjectURL(
    new Blob([selectedFile], { type: "application/pdf" })
  );
  if (!permission.includes("documents-user")) {
    <Unauthorized />;
  }
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedFile;
    link.download = `${title}.pdf`; // This will set a filename for the downloaded file. Adjust as necessary.
    document.body.appendChild(link); // Append to body temporarily to trigger the click event
    link.click();
    document.body.removeChild(link); // Remove after triggering the click event
  };
  return (
    <>
      <Stack id={"topSection"}>
        <Stack direction={"row"} justifyContent={"space-between"}></Stack>
        <PageHeadingComponent
          subtitle={"Documenten"}
          title={"Marketing ondersteuning"}
        />
        <Divider />
      </Stack>
      <Stack id={"pageContent"} mt={"1rem"}>
        {!loading &&
          DocumentListItems.map((item, index) => (
            <>
              <DocumentListItem
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
        width={30.125}
        open={open}
        setOpen={setOpen}
        title={title}
        children={
          <>
            <FilePreview
              documentId={selectedDocumentId}
              setSelectedFile={setSelectedFile}
            />
            <GrowBox />
            <NavigationButtons
              disabled={false}
              handleNext={() => {
                setOpen(false);
              }}
              handleBack={handleDownload} // Change to handleDownload function
              backText="Downloaden"
              nextText="Sluiten"
              fileDownLoad={true}
            />
          </>
        }
      />
    </>
  );
};

export default Documents;
