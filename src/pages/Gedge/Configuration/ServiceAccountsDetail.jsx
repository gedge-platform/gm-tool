import React, { useState, useEffect } from "react";
import CommActionBar from "@/components/common/CommActionBar";
import { CIconButton, CSelectButton } from "@/components/buttons";
import { PanelBox } from "@/components/styles/PanelBox";
import { swalConfirm } from "@/utils/swal-utils";
import { CScrollbar } from "@/components/scrollbars";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import LogDialog from "../../Template/Dialog/LogDialog";
import { CDatePicker } from "@/components/textfields/CDatePicker";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import styled from "styled-components";
import moment from "moment";
import serviceAccountStore from "../../../store/ServiceAccount";
import { isValidJSON } from "../../../utils/common-utils";
import ReactJson from "react-json-view";

const TableTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: #2f3855;

  p {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Label = styled.span`
  height: 20px;
  background-color: #20263a;
  vertical-align: middle;
  padding: 0 2px 0 2px;
  line-height: 20px;
  font-weight: 600;
  margin: 6px 6px;

  .key {
    padding: 0 2px;
    background-color: #eff4f9;
    color: #36435c;
    text-align: center;
  }
  .value {
    padding: 0 2px;
    text-align: center;
    color: #eff4f9;
  }
`;

const ServiceAccountsDetail = observer(() => {
  const {
    serviceAccountDetail: {
      annotations,
      cluster,
      createdAt,
      label,
      name,
      namespace,
      secretCnt,
      secrets,
    },
  } = serviceAccountStore;

  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PanelBox style={{ overflowY: "hidden" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Data" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody className="tb_data_detail">
              <tr>
                <th>Name</th>
                <td>{name}</td>
                <th>Project</th>
                <td>{namespace}</td>
              </tr>
              <tr>
                <th>Cluster</th>
                <td>{cluster}</td>
                <th>Secrets Count</th>
                <td>{secretCnt}</td>
              </tr>
              <tr>
                <th>Secrets Name</th>
                <td>{secrets[0].name}</td>
                <th>Create Time</th>
                <td>{moment(createdAt).format("YYYY-MM-DD HH:MM")}</td>
              </tr>
            </tbody>
          </table>

          <TableTitle>Labels</TableTitle>
          <LabelContainer>
            {label ? (
              Object.entries(label).map(([key, value]) => (
                <Label>
                  <span className="key">{key}</span>
                  <span className="value">{value}</span>
                </Label>
              ))
            ) : (
              <p>No Labels Info.</p>
            )}
          </LabelContainer>

          <TableTitle>Annotations</TableTitle>
          <table className="tb_data">
            <tbody>
              {annotations ? (
                Object.entries(annotations).map(([key, value]) => (
                  <tr>
                    <th style={{ width: "20%" }}>{key}</th>
                    <td>
                      {isValidJSON(value) ? (
                        <ReactJson
                          src={JSON.parse(value)}
                          theme="summerfruit"
                          displayDataTypes={false}
                          displayObjectSize={false}
                        />
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Annotations Info.</td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default ServiceAccountsDetail;
