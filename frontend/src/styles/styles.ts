import { styled } from '@mui/material/styles';

export const MyDivContainer = styled("div")(({ theme }) => ({
    display: "flex",
    width: "100%",
    margin: `${theme.spacing(0)} auto`,
    flexDirection: "column",
    autoComplete: "on",
}));