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
import PersonDetailDrawerChildren from "@/pages/Portfolio/Customer/RelationDetails";
import DrawerComponent from "./DrawerComponent";
import PolicyDetails from "../pages/Portfolio/Customer/PolicyDetails";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {
  selectDrawerState,
  setDrawerState,
} from "../lib/redux/slices/layoutSlice";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { useAppSelector } from "../lib/hooks/useAppSelector";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
            >
              {PolicyDetails(row, name)}
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
  const dispatch = useAppDispatch();
  const drawerState = useAppSelector(selectDrawerState);
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
                  onClick={() => dispatch(setDrawerState(!drawerState))}
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
        title="Klantinformatie"
      >
        {PersonDetailDrawerChildren(data)}
      </DrawerComponent>
    </Box>
  );
};

export default PortfolioTabs;
