import { Box, CircularProgress } from "@mui/material";

type SpinnerProps = { size?: number };

export default function Spinner({ size = 80 }: SpinnerProps) {
  return (
    <Box sx={{ height: "90%", display: "grid", placeContent: "center" }}>
      <CircularProgress size={size} />
    </Box>
  );
}
