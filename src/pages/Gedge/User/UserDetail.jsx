import React, { useState } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import { dateFormatter } from "@/utils/common-utils";
const UserDetail = observer((props) => {
  const { user } = props;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Overview" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="panelCont">
            <table className="tb_data">
              <tbody className="tb_data_detail">
                <tr>
                  <th>ID</th>
                  <td>{user.memberId}</td>
                  <th>Name</th>
                  <td>{user.memberName}</td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>{user.memberEmail}</td>
                  <th>Member Role</th>
                  <td>{user.memberRole}</td>
                </tr>
                <tr>
                  <th>Contact</th>
                  <td>{user.memberContact}</td>
                  <th>Created</th>
                  <td>{dateFormatter(user.created_at)}</td>
                </tr>
                {/* <tr>
                  <th>승인여부</th>
                  <td>
                    {userDetail.enabled ? (
                      <span class="state_ico state_02">승인</span>
                    ) : (
                      <span class="state_ico state_04">승인 대기</span>
                    )}
                  </td>
                  <th>Last Login</th>
                  <td>{moment(userDetail.logined_at).format("YYYY-MM-DD")}</td>
                </tr> */}
                <tr>
                  <th>Last Longin</th>
                  <td>{dateFormatter(user.logined_at)}</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CTabPanel>
      </div>
    </PanelBox>
  );
});
export default UserDetail;
