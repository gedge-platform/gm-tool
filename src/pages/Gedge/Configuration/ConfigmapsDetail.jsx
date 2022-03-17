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
import configmapsStore from "../../../store/Configmaps";
import moment from "moment";

const ConfigmapsDetail = observer(() => {
  const {
    configmapsList,
    configmapsDetail,
    configmapsData,
    configmapsTabList,
  } = configmapsStore;
  const configmapsTable = [];
  const metadata = configmapsTabList.data;
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
    configmapsTable.push(
      <tr>
        <th>{keys}</th>
        <td>{value}</td>
        {/* <td style={{ whiteSpace: "pre-line" }}>{value.String()}</td> */}
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
                <th>Name</th>
                <td>{configmapsTabList.name}</td>
              </tr>
              <tr>
                <th>Project</th>
                <td>{configmapsTabList.namespace}</td>
              </tr>
              <tr>
                <th>Cluster</th>
                <td>{configmapsTabList.cluster}</td>
              </tr>
              {configmapsTable}
              <tr>
                <th>Annotations</th>
                <td>{configmapsTabList.annotations}</td>
              </tr>
              <tr>
                <th>Data Count</th>
                <td>{configmapsTabList.dataCnt}</td>
              </tr>
              <tr>
                <th>Create Time</th>
                <td>
                  {moment(configmapsTabList.createAt).format(
                    "YYYY-MM-DD HH:MM"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </CTabPanel>
    </PanelBox>
  );
});
export default ConfigmapsDetail;
