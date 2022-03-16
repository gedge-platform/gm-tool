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

const Detail = observer((props) => {
  const { configuration } = props;
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
    <PanelBox style={{ overflowY: "scroll" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="상세정보" />
        <CTab label="리소스 사용량" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>
              <tr>
                <th>클러스터</th>
                <td>{cluster.clusterName}</td>
              </tr>
              <tr>
                <th>쿠버네티스 버전</th>
                <td>{cluster.kubeVersion}</td>
              </tr>
              <tr>
                <th>역할</th>
                <td></td>
              </tr>
              <tr>
                <th>생성자</th>
                <td>{cluster.clusterCreator}</td>
              </tr>
              <tr>
                <th>생성일</th>
                <td>{cluster.create_at}</td>
              </tr>
              <tr>
                <th>업데이트일</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CTabPanel>
      <CTabPanel value={tabvalue} index={1}>
        <div className="panelCont">
          <div className="grid-height">123</div>
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default Detail;
