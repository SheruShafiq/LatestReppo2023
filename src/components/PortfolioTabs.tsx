import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoDisplay from "./InfoDisplay";
import { use } from "chai";
import GenericTable, { Column } from "./GenericTable";
import PersonDetailDrawer from "./DrawerComponent";
import PersonDetailDrawerChildren from "../pages/PortfolioItem/DrawerChildren/PersonDetailDrawerChildren";
import DrawerComponent from "./DrawerComponent";
import PolicyDetailDrawerChildren from "../pages/PortfolioItem/DrawerChildren/PolicyDetailDrawerChildren";
import ChevronRight from "@mui/icons-material/ChevronRight";
import MutationDrawerParent from "./MutationDrawerParent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  // const policies = data?.relations[0].policies;
  // const name = data?.name;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export type PortfolioTabsProps = {
  data: any;
};

const PortfolioTabs = ({ data }: PortfolioTabsProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [totalCoverage, setTotalCoverage] = React.useState("");
  useEffect(() => {
    if (data) {
      let route = data.relations[0].policies;
      let total = 0;

      route.forEach((policy: any) => {
        total += policy.coverage;
      });
      setTotalCoverage(`€${total}`);
    }
  }, [data]);
  const headers = [
    "Polisnummer",
    "Product",
    "Einddatum",
    "Status",
    "Premie",
    "Dekking",
  ];
  const [open, setOpen] = useState(false);
  const columns: Column[] = [
    {
      header: "Polisnummer",
      accessor: "external_number",
      align: "left",
    },
    {
      header: "Product",
      accessor: "product_name",
      align: "left",
    },
    {
      header: "Startdatum",
      accessor: "premium_enddate",
      align: "left",
    },
    {
      header: "Status",
      accessor: "status",
      align: "left",
    },
    {
      header: "Premie",
      accessor: "premium",
      align: "left",
    },
    {
      header: "Dekking",
      accessor: "coverage",
      align: "left",
      cell: (row: any) => <>{`€${row.coverage}`}</>,
    },

    {
      header: "",
      accessor: "",
      align: "right",
      cell: (row: any) => {
        const [open, setOpen] = useState(false); // local state for the drawer's open state

        return (
          <>
            <IconButton
              onClick={() => setOpen(!open)}
              data-testid="chevron-right"
            >
              <ChevronRight />
            </IconButton>
            <DrawerComponent
              open={open}
              setOpen={setOpen}
              title="Polisinformatie"
              width={0}
            >
              {PolicyDetailDrawerChildren(row, name, setOpen)}
            </DrawerComponent>
          </>
        );
      },
    },
  ];

  const policies = data?.relations[0].policies;
  const name = data?.name;
  const [extraWidth, setExtraWidth] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("Klantinformatie");
  const [currentChildren, setCurrentChildren] = useState("");

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="POLISINFORMATIE" {...a11yProps(0)} />
          <Tab label="Betaalgeschiedenis" {...a11yProps(1)} />
          <Tab label="Documenten" {...a11yProps(2)} disabled />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box display={"flex"} width={"100%"} flexDirection={"column"}>
          <Box width={"100%"}>
            {data?.name ? (
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={() => setDrawerOpen(true)}
              >
                <Avatar
                  sx={{
                    position: "relative",
                    top: "0rem",
                    backgroundColor: "#E4EAF2",
                    color: "#94A3B8",
                  }}
                />
                <Typography
                  variant="h1"
                  fontWeight={600}
                  fontSize={24}
                  marginLeft={"1.5rem"}
                >
                  {data?.name}
                </Typography>
              </Box>
            ) : (
              <Box display={"flex"} alignItems={"center"}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  animation={false}
                />

                <Skeleton
                  variant="text"
                  animation={false}
                  height="45px"
                  width={"10%"}
                  sx={{ my: -0.38, mx: 3 }}
                />
              </Box>
            )}

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginTop={"1rem"}
            >
              <InfoDisplay
                label="Relatienummer"
                value={data?.relations[0].external_number}
              />
              <InfoDisplay
                label="Geboorte Datum"
                value={data?.relations[0].birthdate}
              />
              <InfoDisplay label="Verzekerd voor" value={totalCoverage} />
            </Box>
          </Box>
          <Box width={"100%"}>
            <GenericTable tableContent={policies} columns={columns} />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>

      <DrawerComponent
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={currentTitle}
        width={extraWidth}
        setCurrentChildren={setCurrentChildren}
        setExtraWidth={setExtraWidth}
      >
        {currentChildren === "mutation" ? (
          <MutationDrawerParent data={data} />
        ) : (
          <PersonDetailDrawerChildren
            data={data}
            setOpen={setOpen}
            setExtraWidth={setExtraWidth}
            setCurrentTitle={setCurrentTitle}
            setCurrentChildren={setCurrentChildren}
          />
        )}
      </DrawerComponent>
    </Box>
  );
};

export default PortfolioTabs;
