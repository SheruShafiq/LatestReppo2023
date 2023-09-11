import { Box, Divider, Stack, Typography } from "@mui/material";
import News, { ArticleType } from "@/components/News";
import React, { useEffect, useState } from "react";

import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import { QuickLink } from "@/components/QuickLink";
import { RecentLink } from "@/components/RecentLink";
import { Title } from "@/components/Title";
import { selectRecentlyViewed } from "@/lib/redux/slices/layoutSlice";
import { useAppSelector } from "@/lib/hooks/useAppSelector";

export type RecentLinkType = {
  heading: string | undefined;
  subHeading: string[] | undefined;
  url?: string | undefined;
};

type QuickLinkPropsType = {
  text: string;
  onClick: () => void;
};

const Home: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const service = new AerService(AerClient);
  const recentLinks = useAppSelector(selectRecentlyViewed);
  const quickLinkProps: QuickLinkPropsType[] = [
    {
      text: "Zoek een klant",
      onClick: () => {
        console.log("klantCLicked");
      },
    },
    {
      text: "Niweuwe aanvraag",
      onClick: () => {
        console.log("nieuwe aanvraag");
      },
    },
    {
      text: "Bereken aanvraagkosten",
      onClick: () => {
        console.log("bereken aanvraagkosten");
      },
    },
    {
      text: "Zoek document",
      onClick: () => {
        console.log("zoek document");
      },
    },
  ];
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await service.getNews();
        setArticles(fetchedArticles);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchArticles();
  }, []);

  const currentMutations: RecentLinkType[] = [
    {
      heading: "Adres Wijziging",
      subHeading: ["Relatienummer 123123134", "Jan Van Dijk"],
    },
    {
      heading: "Betaalwijze",
      subHeading: [
        "Polisnummer 123456789",
        "Uitvaartverzekering Basis 2023",
        "Ingrid van Dijk",
      ],
    },
  ];

  const mockArticles: ArticleType = [
    {
      title: "Monuta verkozen tot ‘Beste digitale verzekeraar van 2023’",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. ",
    },
    {
      title: "Monuta verkozen tot ‘Beste digitale verzekeraar van 2023’",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. ",
    },
  ];
  return (
    <Box display="flex" flexDirection="row" width="100%">
      <Stack id="leftSide" width="100%">
        <Title
          heading="Welkom Test Gebruiker"
          subHeading="Voorbeeld Verzekeringen BV"
        />
        <Box
          display="flex"
          flexDirection="row"
          mt="1.5rem"
          id="quickLinks"
          gap="1.5rem"
        >
          {quickLinkProps.map(({ text, onClick }) => (
            <QuickLink key={text} text={text} onClick={onClick} />
          ))}
        </Box>

        <News articles={articles || mockArticles} onMobile={true} />
      </Stack>
      <Stack id="rightSide" width="18.75rem" height="100%" ml="3rem">
        <Stack m={1.5} height="100%">
          {recentLinks.length > 0 && (
            <Stack id="recentlyOpened">
              <Typography
                fontFamily={"Inter"}
                fontSize={"0.875rem"}
                fontStyle={"Inter"}
                fontWeight={"500"}
                lineHeight={"1.375rem"}
                mb={"0.5rem"}
              >
                Recent geopend
              </Typography>
              <Divider />
              <Stack pl="0.5rem">
                {recentLinks.map((props) => (
                  <RecentLink key={props.url} {...props} />
                ))}
              </Stack>
            </Stack>
          )}
          <Stack id="onGoingMutations" mt={recentLinks.length > 0 ? "2rem" : 0}>
            <Typography
              fontFamily={"Inter"}
              fontSize={"0.875rem"}
              fontStyle={"Inter"}
              fontWeight={"500"}
              lineHeight={"1.375rem"}
              mb={"0.5rem"}
            >
              Mutaties in behandeling
            </Typography>
            <Divider />
            <Stack pl="0.5rem">
              {currentMutations.map((props) => (
                <RecentLink key={props.heading} {...props} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
