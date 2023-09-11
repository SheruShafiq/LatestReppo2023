import { Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";

import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";

export type FilePreviewProps = {
  documentId: string;
  setSelectedFile: any;
};

function FilePreview({ documentId, setSelectedFile }: FilePreviewProps) {
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading before fetch
      setData(null); // Clear old data immediately

      const service = new AerService(AerClient);
      const response = await service.getDocument(documentId);
      if (response) {
        setError(null);
        console.log(response);
        setData(response);
        setTimeout(() => {
          setLoading(false); // End loading after a delay
        }, 2000);
      } else {
        setError({
          message: "Error fetching data",
        });
      }
    };
    fetchData();
  }, [documentId]);

  useEffect(() => {
    setSelectedFile(data);
  }, [data, setSelectedFile]);

  if (!documentId) {
    return <Box bgcolor={"#E4EAF2"} height={"75%"} width={"100%"}></Box>;
  }

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={"100%"}
        width={"100%"}
      />
    );
  } else if (typeof data === "string" && data.startsWith("blob:") && !loading) {
    return (
      <embed src={data} type="application/pdf" width="100%" height="100%" />
    );
  } else {
    return <div>Error: {error.message}</div>;
  }
}

export default FilePreview;
