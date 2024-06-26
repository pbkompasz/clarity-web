import Stack from "@mui/material/Stack";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";

import CodeEditor from "./editor/Editor";
import Preview from "./preview/preview";
import Clarity from "../assets/clarity.jpg";

function PlaygroundLayout() {
  const [clarityVersion] = useState("latest");
  const [stacksVersion] = useState("latest");

  return (
    <>
      <Stack
        className="header"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "100vw", borderBottom: "solid 1px white" }}
      >
        <Stack
          style={{ padding: "0.5rem 1rem" }}
          direction="row"
          alignItems="center"
        >
          <img
            src={Clarity}
            alt="clarity-icon"
            style={{ height: "1rem", width: "1rem" }}
          />
          Clarity Playground
        </Stack>
        <Stack
          className="header"
          direction="row"
          alignItems="center"
          gap={2}
          paddingRight="1rem"
        >
          <div>Clarity Version {clarityVersion}</div>
          <div>Stacks Version {stacksVersion}</div>
          <ReplayIcon style={{ cursor: "pointer" }}></ReplayIcon>
        </Stack>
      </Stack>
      <Stack direction="row">
        <CodeEditor></CodeEditor>
        <Preview></Preview>
      </Stack>
    </>
  );
}

export default PlaygroundLayout;
