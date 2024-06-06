import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "../../styles";
import { AppBar, Toolbar, Button, } from "@material-ui/core";

const Bot = () => {
    const classes = useStyles();
  return (
   <>
    <AppBar position="static">
    <Toolbar className={classes.toolbar}>
        <Button className={classes.navButton} href="/">Home</Button>
        <Button className={classes.navButton} href="/ocr">OCR</Button>
    </Toolbar>
    <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>Expense ChatBot</h1>

  </AppBar>
    <div style={{height:"100%", width:"100%"}}>
    <div style={{width:"70%",margin:"auto",marginTop:"20vh", maxWidth:"900px"}}>
    <Grid item xs={12} className={classes.chatbotContainer}>
        <iframe
          className={classes.chatbotIframe}
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/3d9c9eb1-50a4-49e6-859b-50c0be33cf34"
        ></iframe>
      </Grid>
    </div>
    </div>
   </>
  );
};

export default Bot;
