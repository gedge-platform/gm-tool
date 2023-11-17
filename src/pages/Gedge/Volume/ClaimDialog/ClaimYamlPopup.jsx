import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { volumeStore } from "@/store";
import { claimStore } from "@/store";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
// import YAML from "yamljs";
import { isEmpty } from "lodash-es";
import { stringify } from "json-to-pretty-yaml2";

const ClaimYamlPopup = observer(() => {
  const { content, setContent, setTemplateAnnotation, setTemplateLabel } =
    claimStore;

  useEffect(() => {
    setTemplateAnnotation();
    setTemplateLabel();
    if (content) {
      var obj_content = YAML.parse(content);
      if (
        obj_content.metadata.annotations === ': ""' ||
        isEmpty(obj_content.metadata.annotations)
      ) {
        delete obj_content.metadata.annotations;
      }
      if (
        obj_content.metadata.labels === ': ""' ||
        isEmpty(obj_content.metadata.labels)
      ) {
        delete obj_content.metadata.labels;
      }
      setContent(stringify(obj_content));
    }
  }, [content]);

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
            <span>설정 검토</span>
          </div>
        </div>
      </div>
      <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="editor"
        width="90%"
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
    </>
  );
});

export default ClaimYamlPopup;
