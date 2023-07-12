import { observer } from "mobx-react";
import podStore from "../../../../../../store/Pod";
import { CTextField } from "@/components/textfields";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const CreatePodStepTwo = observer((props) => {
  const {
    podInfo,
    setPodInfo,
  } = podStore;

  const [ label, setLabel ] = useState({key: "", value: ""});
  const [ annotation, setAnnotation ] = useState({key: "", value: ""});

  const onChangeLabel = (e) => {
    setLabel({
      ...label,
      [e.target.name]: e.target.value,
    });
  }

  const onChangeAnnotation = (e) => {
    setAnnotation({
      ...annotation,
      [e.target.name]: e.target.value,
    })
  }

  const addLabel = () => {
    setPodInfo("labels", [
      ...podInfo.labels,
      label
    ]);
    setLabel({key: "", value: ""});
  }

  const addAnnotation = () => {
    setPodInfo("annotations", [
      ...podInfo.annotations,
      annotation
    ]);
    setAnnotation({key: "", value: ""});
  }
  
  const remove = (type, index) => {
    setPodInfo(type, podInfo[type].filter((_, idx) => idx !== index));
  }

  return(
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>스케줄러</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>설정 검토</span>
          </div>
        </div>
      </div>

      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th rowSpan={podInfo.labels.length + 1}>Labels</th>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="key"
                onChange={onChangeLabel}
                value={label.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeLabel}
                value={label.value}
              />
            </td>
            <td>
              <Button
                style={{
                  border: "none",
                  height: "28px",
                  width: "30px",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "normal",
                  color: "#36435c",
                  backgroundColor: "#eff4f9",
                  padding: "0 0 0 0",
                  borderRadius: "0",
                }}
                onClick={addLabel}
              >
                +
              </Button>
            </td>
          </tr>
          {podInfo.labels.map((label, index) => (
            <tr>
              <td style={{ paddingLeft: "5px" }}>{label.key}</td>
              <td style={{ paddingLeft: "5px" }}>{label.value}</td>
              <td>
                <Button
                  style={{
                    border: "none",
                    height: "28px",
                    width: "30px",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "normal",
                    color: "#36435c",
                    backgroundColor: "#eff4f9",
                    padding: "0 0 0 0",
                    margin: "2px",
                    borderRadius: "0",
                  }}
                  onClick={() => remove("labels", index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <th rowSpan={podInfo.annotations.length + 2}>Annotations</th>
            <td>
              <CTextField
                type="text"
                placeholder="Key"
                className="form_fullWidth"
                name="key"
                onChange={onChangeAnnotation}
                value={annotation.key}
              />
            </td>
            <td>
              <CTextField
                type="text"
                placeholder="Value"
                className="form_fullWidth"
                name="value"
                onChange={onChangeAnnotation}
                value={annotation.value}
              />
            </td>
            <td>
              <Button
                style={{
                  border: "none",
                  height: "28px",
                  width: "30px",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "normal",
                  color: "#36435c",
                  backgroundColor: "#eff4f9",
                  padding: "0 0 0 0",
                  borderRadius: "0",
                }}
                onClick={addAnnotation}
              >
                +
              </Button>
            </td>
          </tr>
          {podInfo.annotations.map((annotation, index) => (
            <tr>
              <td style={{ paddingLeft: "5px" }}>{annotation.key}</td>
              <td style={{ paddingLeft: "5px" }}>{annotation.value}</td>
              <td>
                <Button
                  style={{
                    border: "none",
                    height: "28px",
                    width: "30px",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "normal",
                    color: "#36435c",
                    backgroundColor: "#eff4f9",
                    padding: "0 0 0 0",
                    margin: "2px",
                    borderRadius: "0",
                  }}
                  onClick={() => remove("annotations", index)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
})

export default CreatePodStepTwo;