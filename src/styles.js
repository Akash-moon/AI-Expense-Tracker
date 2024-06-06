import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  column: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  chatbotIframe: {
    width: "100%",
    height: "400px", // Set a specific height or adjust as needed
    border: "none",
  },
  navButton: {
    margin: theme.spacing(1),
    color: "white",
    backgroundColor: "#3f51b5",
    border: "1px solid black",
    '&:hover': {
      backgroundColor: "#303f9f",
      borderColor: "#000000",
    },
    borderRadius: "5px",
    padding: theme.spacing(1, 3),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
