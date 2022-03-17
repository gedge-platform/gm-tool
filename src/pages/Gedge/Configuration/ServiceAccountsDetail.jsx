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
import serviceAccountStore from "../../../store/ServiceAccount";

const ServiceAccountsDetail = observer(() => {
  const { serviceAccountTabList } = serviceAccountStore;
  const serviceAccountTable = [];
  const metadata = serviceAccountTabList.data;
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

  Object.entries(metadata).map(([keys, value]) => {
    serviceAccountTable.push(
      <tr>
        <th>{keys}</th>
        <td style={{ wordBreak: "break-all", wordWrap: "break-word" }}>
          {/* 강제로 줄바꿈 */}
          {value}
        </td>
      </tr>
    );
  });

  return (
    <PanelBox style={{ overflowY: "scroll" }}>
      <CTabs type="tab2" value={tabvalue} onChange={handleTabChange}>
        <CTab label="Data" />
      </CTabs>
      <CTabPanel value={tabvalue} index={0}>
        <div className="tb_container">
          <table className="tb_data">
            <tbody>
              <tr>
                <th>nama</th>
                <td>{serviceAccountTabList.name}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default ServiceAccountsDetail;
