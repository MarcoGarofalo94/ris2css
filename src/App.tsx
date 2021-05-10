import './App.css';

import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import logo from './logo.svg';

const reactToCSS = require("react-style-object-to-css");

// result === "background-color: blue;  font-size: 14px;"

function App() {
  const [inputCSS, setInputCSS] = React.useState("");
  const [outputCSS, setOutputCSS] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    try {
      
      const obj = eval("(" + inputCSS + ")");

      const result = reactToCSS(obj);
      setOutputCSS(
        "\n{\n  " + result.split(";").join(";\n").trimEnd() + "\n}\n"
      );
    } catch (error) {
      console.log('bad input - please make sure its a javascript object');
    }
  }, [inputCSS]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Paste React inline style there:
            <textarea
              id="w3review"
              name="w3review"
              rows={4}
              cols={50}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setInputCSS(e.target.value);
              }}
              value={inputCSS}
            />
          </div>
          <br></br>
          <div
            style={{
              display: "flex",

              position: "relative",
            }}
          >
            <SyntaxHighlighter
              language="css"
              customStyle={{
                flex: 1,
                textAlign: "left",
                minHeight: "30px",
                height: "100%",
                margin: "0",
              }}
              style={vs2015}
            >
              {outputCSS}
            </SyntaxHighlighter>
            <div style={{ position: "absolute", top: "1%", right: "0" }}>
              <CopyToClipboard text={outputCSS} onCopy={() => setCopied(true)}>
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                  <IconButton style={{ width: "52px", height: "52px" }} onMouseLeave={() => setTimeout(() =>setCopied(false),100)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#60d8f9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </header>
      <footer className="App-footer">
        @ Marco Garofalo
      </footer>
    </div>
  );
}

export default App;
