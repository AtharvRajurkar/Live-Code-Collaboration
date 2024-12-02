
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import AWS from "aws-sdk"; // Import AWS SDK for S3 compatibility

const resizeObserverLoopErr = (err) => {
  if (
    err.message ===
    "ResizeObserver loop completed with undelivered notifications"
  ) {
    return;
  }
  throw err;
};

window.addEventListener("error", resizeObserverLoopErr);

const MonacoFileEditor = () => {
  const [content, setContent] = useState("// Start typing...");

  // AWS S3 Client Configuration to interact with Storj
  const s3 = new AWS.S3({
    endpoint: "https://gateway.storjshare.io",
    accessKeyId: "jx6qwuaz3mwctdeutksigqqjtxra",
    secretAccessKey: "jynjundo5hmpjwlpejarxjm4ljmfqlgq6kzjx4rm5vg6idr2ka7a6",
    region: "AP1",
    s3ForcePathStyle: true,
  });

  const saveFileToStorj = async () => {
    try {
      const params = {
        Bucket: "firstbucket",
        Key: "secondfile.txt",
        Body: content,
      };

      s3.putObject(params, (err, data) => {
        if (err) {
          console.error("Error uploading file to Storj:", err);
          alert("Failed to upload file to Storj.");
        } else {
          console.log("File uploaded successfully:", data);
          alert("File successfully uploaded to Storj!");
        }
      });
    } catch (error) {
      console.error("Error uploading file to Storj:", error);
      alert("Failed to upload file to Storj.");
    }
  };

  const retrieveFileFromStorj = async () => {
    try{
      const params = {
        Bucket: 'firstbucket',
        Key: 'firstfile.txt',
      }

      s3.getObject(params, (err, data) => {
        if(err){
          console.log('error while retrieving file');
        }
        else{
          const stuff = data.Body.toString("utf-8");
          setContent(stuff);
        }
      })
    } catch (error){
      console.log('error accessing file from storj', error);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <button onClick={saveFileToStorj} style={{ margin: "10px" }}>
        Save to Storj
      </button>
      <button onClick={retrieveFileFromStorj} style={{ margin: "10px" }}>
        Retrieve File from Storj
      </button>

      {/* Monaco Editor */}
      <Editor
        height="90%"
        language="javascript"
        theme="vs-dark"
        value={content}
        onChange={(value) => setContent(value)}
      />
    </div>
  );
};

export default MonacoFileEditor;
