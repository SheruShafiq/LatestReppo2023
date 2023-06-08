import { Accordion, AccordionDetails, styled } from "@mui/material";
import React from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

export type CollapsibleListItemProps = {
  title: string;
  content: string;
};

export const CollapsibleListItem = ({
  title,
  content,
}: // TODO: change the question and awnser to something a bit more generic
CollapsibleListItemProps) => {
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .00)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  return (
    <Accordion
      sx={{
        border: "0px none #fff",
        boxShadow: "none",
        "&:before": {
          display: "none",
        },
      }}
      disableGutters
      square
    >
      <AccordionSummary
        sx={{
          fontSize: "0.8rem",
        }}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          color: "#6C737F",
          fontSize: "0.9rem",
          lineHeight: "1.5rem",
          marginLeft: "1.4rem",
          marginTop: "0px",
          marginBottom: "0px",
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingRight: "0px",
        }}
      >
        {content}
      </AccordionDetails>
    </Accordion>
  );
};
