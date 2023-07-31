import React, { useEffect, useState } from "react";
import { setInFlow, selectDrawerState, selectReset, setReset } from "@/lib/redux/slices/mutationSlice";
import SelectableMutations from "./SelectableMutations";

// Imported components
import Adress from "./Relations/Adress/Address";
import Contact from "./Relations/Contact/Contact";
import Payment from "./Policies/Payment/Payment";
import Koverage from "./Policies/Koverage/Koverage";
import Index from "./Policies/Index/Index";
import Burial from "./Policies/Burial/Burial";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";

const ScreenController = () => {
    const dispatch = useAppDispatch();

    const sections = [
        {
          id: "1",
          subtitle: "Aanpassing op polis(sen)",
          items: [
            {
              primaryText: "Coverage",
              disabled: true,
              component: Koverage,
              handler: () => handleNext(Koverage),
            },
            {
              primaryText: "Betaalwijze",
              disabled: false,
              component: Payment,
              handler: () => handleNext(Payment),
            },
            {
              primaryText: "Indexatie",
              disabled: true,
              component: Index,
              handler: () => handleNext(Index),
            },
            {
              primaryText: "Beëindiging",
              disabled: true,
              component: Burial,
              handler: () => handleNext(Burial),
            },
          ],
        },
        {
          id: "2",
          subtitle: "Aanpassing van persoonsgegevens",
          items: [
            {
              primaryText: "Adres",
              disabled: false,
              component: Adress,
              handler: () => handleNext(Adress),
            },
            {
              primaryText: "Contactgegevens",
              disabled: true,
              component: Contact,
              handler: () => handleNext(Contact),
            },
          ],
        },
      ];
      

    const [currentScreen, setCurrentScreen] = useState(() => SelectableMutations);

    const handleNext = (component: () => JSX.Element) => {
        setCurrentScreen(() => component);
    };

    const handleBack = (component: any) => {
        setCurrentScreen(() => component);
    };

    const drawerState = useAppSelector(selectDrawerState);

    useEffect(() => {
        handleBack(SelectableMutations);
        dispatch(setInFlow(false));
    }, [drawerState]);

    useEffect(() => {
        dispatch(setReset(false));
        dispatch(setInFlow(false));
        handleBack(SelectableMutations);
      }, [useAppSelector(selectReset)]);

    const Screen = currentScreen;

    return (
        <Screen
            sections={sections} //local
        />
    );
};

export default ScreenController;
