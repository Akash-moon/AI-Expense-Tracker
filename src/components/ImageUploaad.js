import React, { useState, useEffect } from "react";
import "./ImageUpload.css";
import useStyles from "../styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();
  const [details, setDetails] = useState({ name: "", date: "", total: "" });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch("http://localhost:5000/process-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    // data = ;
  
    const cleanedInput = data.message.replace(/\r\n/g, '');

    // Replace single quotes with double quotes to create a valid JSON string
    const jsonString = cleanedInput.replace(/'/g, '"');
    
    // Parse the JSON string
    const ans = JSON.parse(jsonString);
    console.log(ans);
    setDetails({
      name: ans.name,
      date: ans.date,
      total: ans.total,
    });
  };

  // useEffect(() => {
  //   if (details.name) {
  //     // Refresh the page when details are received
  //     window.location.reload();
  //   }
  // }, [details]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button className={classes.navButton} href="/">
            Home
          </Button>
          <Button className={classes.navButton} href="/bot">
            ChatBot
          </Button>
        </Toolbar>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Expense Tracker
        </h1>
      </AppBar>
      <div className="file-upload-container">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          Upload Your Image
        </h1>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
        {details.name && (
          <div className="result">
            <p>Name: {details.name}</p>
            <p>Date: {details.date}</p>
            <p>Total: {details.total}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;