import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import {
  logout,
  selectSessionExpiresAt,
  setSessionExpiresAt,
} from "../lib/redux/slices/sessionSlice";
import { d } from "vitest/dist/types-e3c9754d";

const LogoutTimer = () => {
  const timeoutVisible = 300; // 5 minutes in milliseconds
  const dispatch = useAppDispatch();
  const [state, setState] = useState(false);
  const [time, setTime] = useState("00:00");
  // const [currentTime, setCurrentTime] = useState(new Date().getTime());
  // const [expiryTime, setExpiryTime] = useState(new Date().getTime() + timeoutVisible);
  const [progress, setProgress] = useState(100);
  const [seconds, setSeconds] = useState(timeoutVisible); // 5 minutes in seconds
  const expiryStore = useAppSelector(selectSessionExpiresAt);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const expiryTime = parseInt(expiryStore || "0") * 1000;
      const currentTime = new Date().getTime();
      const remainingTime = expiryTime - currentTime;

      if (remainingTime <= 0) {
        // Session has expired
        // dispatch(logout());
        setState(false);
        setTime("00:00");
      } else if (remainingTime < timeoutVisible) {
        setState(true);
        const remainingSeconds = Math.floor(remainingTime / 1000);
        const remainingProgress = (remainingTime / timeoutVisible) * 100;
        setSeconds(remainingSeconds);
        setProgress(remainingProgress);
        setTime(formatTime(remainingSeconds));
      } else {
        setState(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryStore]);

  const formatTime = (time: number) => {
    const minutes = Math.max(0, Math.floor(time / 60));
    const seconds = Math.max(0, time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  async function extendSession() {
    const res = await fetch("/api/sessions/init");
    const newExpiry = await res.json();
    dispatch(setSessionExpiresAt(newExpiry.expires_at));
  }

  function handleLogout() {
    dispatch(logout());
    window.location.href = "/login";
  }

  return (
    <Modal
      open={state}
      onClose={() => extendSession()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "4px",
        }}
        spacing={1}
        data-testid="logout-timer"

      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={600}
          fontSize={"24px"}
        >
          Sessie {seconds > 0 && "bijna "}verlopen
        </Typography>
        
        <Typography
          id="modal-modal-description"
          variant="body1"
          fontSize={"16px"}
          lineHeight={"26px"}
        >
          Je gebruikerssessie gaat verlopen vanwege inactiviteit. Verleng de
          sessie om ingelogd te blijven.
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={"10rem"}
            sx={{
              color: "#94A3B8",
              position: "absolute",
              zIndex: 1,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <CircularProgress
            variant="determinate"
            value={100}
            size={"10rem"}
            sx={{
              color: "#F1F5F9",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="#101828"
              fontWeight={500}
              fontSize={24}
            >
              {time}
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={2} justifyContent={"center"}>
          {seconds > 0 ? (
            <>
              <Button
                variant="outlined"
                onClick={() => dispatch(logout())}
                fullWidth
                sx={{
                  color: "#3C4653",
                  borderColor: "#3C4653",
                }}
              >
                Uitloggen
              </Button>
              <Button
                variant="contained"
                onClick={() => extendSession()}
                fullWidth
              >
                sessie verlengen
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleLogout()}
              sx={{
                alignSelf: "center",
              }}
            >
              Opnieuw Inloggen
            </Button>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};

export default LogoutTimer;



// 1627585800
// 1627584000000