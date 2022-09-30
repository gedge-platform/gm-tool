import React, { useState, useEffect } from "react";
import { dateFormatter } from "@/utils/common-utils";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";

const Detail = observer(props => {
  const { cert } = props;
  console.log("cert is : ", cert);

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

  useEffect(() => {}, []);

  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="panelCont">
            <table className="tb_data">
              <tbody className="tb_data_detail" style={{ whiteSpace: "pre-line" }}>
                <tr>
                  <th>Name</th>
                  <td>{cert.CredentialName}</td>
                  <th>Type</th>
                  <td>{cert.ProviderName}</td>
                </tr>
                <tr>
                  <th>Endpoint</th>
                  <td>{cert.IdentityEndpoint}</td>
                  <th>ProjectID</th>
                  <td>{cert.ProjectID}</td>
                </tr>
                <tr>
                  <th>UserName</th>
                  <td>{cert.Username}</td>
                  <th>Password</th>
                  <td>{cert.Password}</td>
                </tr>
                <tr>
                  <th>AccessId</th>
                  <td>{cert.ClientId}</td>
                  <th>AccessToken</th>
                  <td>{cert.ClientSecret}</td>
                </tr>
                <tr>
                  <th>Region</th>
                  <td>{cert.Region}</td>
                  <th>Zone</th>
                  <td>{cert.Zone}</td>
                </tr>
                <tr>
                  <th>Created</th>
                  <td>{cert.created_at ? dateFormatter(cert.created_at) : "-"}</td>
                </tr>
                <tr>
                  <th>KeyPair</th>
                  <td colspan="3">{cert.KeyPair}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CTabPanel>
      </div>
    </PanelBox>
  );
});
export default Detail;
