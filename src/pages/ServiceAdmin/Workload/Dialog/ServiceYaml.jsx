import { observer } from "mobx-react";
import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import serviceStore from "../../../../store/Service";

const ServiceYaml = observer(() => {
  const { content, setContent } = serviceStore;
  console.log(content);
  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme="monokai"
      name="editor"
      width="100%"
      onChange={(value) => {
        // setContent(value);
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
      readOnly={true}
    />
  );
});

export default ServiceYaml;
