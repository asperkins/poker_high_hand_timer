import { Button } from "@mui/material";
import { styled } from '@mui/material/styles'

const TimerButton = styled(Button)({
  color: 'gold',
  backgroundColor: 'transparent',
  "&:hover": {
    backgroundColor: "transparent"
  },
  "& .MuiTouchRipple-root span": {
    backgroundColor: 'transparent',
  },
  padding: 0,
  width: '100%',
  height: 340,
  fontSize: 420
});

export default TimerButton