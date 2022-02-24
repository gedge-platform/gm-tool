import React, { useState } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { observer } from "mobx-react";
import userStore from "../../Store/UserStore";
import moment from "moment";

const UserDetail = observer((props) => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const { userDetail } = userStore;

  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  return (
    <PanelBox>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="상세정보" />
      </CTabs>
      <div className="tabPanelContainer">
        <CTabPanel value={tabvalue} index={0}>
          <div className="panelCont">
            <table className="tb_data">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{userDetail.id}</td>
                  <th>이름</th>
                  <td>{userDetail.name}</td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>{userDetail.email}</td>
                  <th>부서</th>
                  <td>{userDetail.department}</td>
                </tr>
                <tr>
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
                </tr>
                <tr>
                  <th>등록일</th>
                  <td>{moment(userDetail.created_at).format("YYYY-MM-DD")}</td>
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
