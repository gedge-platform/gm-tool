import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import Detail from "../CronJobDetail";
import cronJobStore from "../../../../store/CronJob";
import moment from "moment";

const CronJobListTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { cronJobList, cronJobDetail, totalElements, loadCronJobList } =
    cronJobStore;

  const [columDefs] = useState([
    {
      headerName: "크론잡 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "cluster",
      filter: true,
    },

    {
      headerName: "프로젝트",
      field: "project",
      filter: true,
    },
    {
      headerName: "워크스페이스",
      field: "",
      filter: true,
    },
    {
      headerName: "스케줄",
      field: "schedule",
      filter: true,
    },
    {
      headerName: "생성날짜",
      field: "creationTimestamp",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${moment(new Date(data.value))
          // .subtract(9, "h")
          .format("YYYY-MM-DD HH:mm")}</span>`;
      },
    },
    {
      headerName: "완료날짜",
      field: "lastScheduleTime",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${moment(new Date(data.value))
          // .subtract(9, "h")
          .format("YYYY-MM-DD HH:mm")}</span>`;
      },
    },
  ]);

  const history = useHistory();

  useEffect(() => {
    loadCronJobList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar isSearch={true} isSelect={true} keywordList={["이름"]}>
            <CCreateButton>생성</CCreateButton>
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  rowData={cronJobList}
                  columnDefs={columDefs}
                  isBottom={true}
                  totalElements={totalElements}
                />
              </div>
            </CTabPanel>
          </div>
        </PanelBox>
        <Detail cronJob={cronJobDetail} />
      </CReflexBox>
    </>
  );
});
export default CronJobListTab;
