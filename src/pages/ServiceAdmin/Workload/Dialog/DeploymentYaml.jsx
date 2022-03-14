import { observer } from "mobx-react";
import React from "react";
import deploymentStore from "../../../../store/Deployment";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

const DeploymentYaml = observer(() => {
  const { content, setContent } = deploymentStore;

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme="monokai"
      name="editor"
      width="100%"
      onChange={(value) => {
        // setContent(value);
        console.log(typeof value);
      }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={content}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  );
});

export default DeploymentYaml;
