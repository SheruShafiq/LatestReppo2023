import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

export interface LogoutTimerModalProps {
  isOpen: boolean;
  onExtendSession: () => void;
  onLogout: () => void;
  seconds: number;
  minutes: number;
  progress: number;
  formatTime: (time: number) => string | number;
}

export function LogoutTimerModal({
  isOpen,
  onExtendSession,
  onLogout,
  seconds,
  minutes,
  progress,
  formatTime,
}: LogoutTimerModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onExtendSession}
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
              {minutes}:{formatTime(seconds % 60)}
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={2} justifyContent={"center"}>
          {seconds > 0 ? (
            <>
              <Button
                variant="outlined"
                onClick={onLogout}
                fullWidth
                sx={{
                  color: "#3C4653",
                  borderColor: "#3C4653",
                }}
              >
                Uitloggen
              </Button>
              <Button variant="contained" onClick={onExtendSession} fullWidth>
                sessie verlengen
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={onLogout}
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
}
