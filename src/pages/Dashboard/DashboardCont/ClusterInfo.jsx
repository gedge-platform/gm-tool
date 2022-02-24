import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import Chart from "react-apexcharts";

import dashboardStore from "../../../Store/DashboardStore";
import { observer } from "mobx-react";

const GraphContainer = styled.div`
  position: relative;
  width: 33%;
`;

const TextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);

  p:first-child {
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.275rem;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #000000;
  }

  p:last-child {
    white-space: nowrap;
    font-size: 1.075rem;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #000000;
  }
`;
const ClusterInfo = observer(() => {
  const pieOptions = {
    legend: {
      show: false,
    },
    labels: ["사용 중", "사용 가능"],
    fill: {
      colors: ["#00B0F0", "rgba(50, 64, 145, 0.1)"],
    },
    dataLabels: {
      enabled: false,
    },
  };
  const { master, worker, total, cpu, memory, storage, pod } = dashboardStore;

  console.log(master);
  const cpuData = {
    // labels: ["", ""],
    datasets: [
      {
        // labels: ["사용 가능", "사용 중"],
        data: [cpu[0], cpu[1] - cpu[0]],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: ["#FFC000", "rgba(50, 64, 145, 0.1)"],
        fill: true,
      },
    ],
  };

  const memoryData = {
    // labels: ["", ""],
    datasets: [
      {
        // labels: ["사용 가능", "사용 중"],
        data: [memory[0], memory[1] - memory[0]],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: ["#B7472A", "rgba(50, 64, 145, 0.1)"],
        fill: true,
      },
    ],
  };

  const storageData = {
    // labels: ["", ""],
    datasets: [
      {
        // labels: ["사용 가능", "사용 중"],
        data: [storage[0], storage[1] - storage[0]],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: ["#F24F44", "rgba(50, 64, 145, 0.1)"],
        fill: true,
      },
    ],
  };

  const podData = {
    // labels: ["", ""],
    datasets: [
      {
        // labels: ["사용 가능", "사용 중"],
        data: [pod[0], pod[1] - pod[0]],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: ["#2F5597", "rgba(50, 64, 145, 0.1)"],
        fill: true,
      },
    ],
  };

  return (
    <div>
      <table className="tb_data">
        <tbody>
          <tr>
            <th>클러스터 이름</th>
            <td>hyper-leager</td>
            <th>쿠버네티스 버전</th>
            <td>1.22.2</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "20px",
        }}
      >
        <GraphContainer>
          <Chart
            options={pieOptions}
            series={[master[0], master[1] - master[0]]}
            type="donut"
          />
          ️
          <TextContainer>
            <p>Master</p>
            <p>
              {master[0]} / {master[1]}
            </p>
          </TextContainer>
        </GraphContainer>
        <GraphContainer>
          <Chart
            options={pieOptions}
            series={[worker[0], worker[1] - worker[0]]}
            type="donut"
          />
          ️
          <TextContainer>
            <p>Worker</p>
            <p>
              {worker[0]}/{worker[1]}
            </p>
          </TextContainer>
        </GraphContainer>

        <GraphContainer>
          <Chart
            options={pieOptions}
            series={[total[0], total[1] - total[0]]}
            type="donut"
          />
          ️
          <TextContainer>
            <p>Total</p>
            <p>
              {total[0]}/{total[1]}
            </p>
          </TextContainer>
        </GraphContainer>
      </div>
      <div style={{}}>
        <div
          style={{
            display: "flex",
            padding: "10px 10px 5px 10px",
            height: "50%",
          }}
        >
          <div
            style={{
              width: "50%",
              marginRight: "5px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="panelTitBar panelTitBar_clear">
              <div className="tit">CPU 정보</div>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#fcfcfe",
                height: "140px",
              }}
            >
              <div>
                <Doughnut
                  data={cpuData}
                  width={130}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
              >
                <div
                  style={{
                    margin: "10px",
                    fontSize: "1.175rem",
                    fontWeight: "600",
                  }}
                >
                  CPU 사용량
                </div>
                <div style={{ margin: "10px", fontSize: "1.175rem" }}>
                  {cpu[0]} / {cpu[1]}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              marginLeft: "5px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="panelTitBar panelTitBar_clear">
              <div className="tit">Memory 정보</div>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#fcfcfe",
                height: "140px",
              }}
            >
              <div>
                <Doughnut
                  data={memoryData}
                  width={130}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
              >
                <div
                  style={{
                    margin: "10px",
                    fontSize: "1.175rem",
                    fontWeight: "600",
                  }}
                >
                  Memory 사용량
                </div>
                <div style={{ margin: "10px", fontSize: "1.175rem" }}>
                  {memory[0]}/{memory[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 10px 5px 10px",
            height: "50%",
          }}
        >
          <div
            style={{
              width: "50%",
              marginRight: "5px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="panelTitBar panelTitBar_clear">
              <div className="tit">Storage 정보</div>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#fcfcfe",
                height: "140px",
              }}
            >
              <div>
                <Doughnut
                  data={storageData}
                  width={130}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
              >
                <div
                  style={{
                    margin: "10px",
                    fontSize: "1.175rem",
                    fontWeight: "600",
                  }}
                >
                  Storage 사용량
                </div>
                <div style={{ margin: "10px", fontSize: "1.175rem" }}>
                  {storage[0]}/{storage[1]}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              marginLeft: "5px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div className="panelTitBar panelTitBar_clear">
              <div className="tit">Pod 정보</div>
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#fcfcfe",
                height: "140px",
              }}
            >
              <div>
                <Doughnut
                  data={podData}
                  width={130}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
              >
                <div
                  style={{
                    margin: "10px",
                    fontSize: "1.175rem",
                    fontWeight: "600",
                  }}
                >
                  Pod 사용량
                </div>
                <div style={{ margin: "10px", fontSize: "1.175rem" }}>
                  {pod[0]}/{pod[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ClusterInfo;
