import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import deploymentStore from "../../../../../../store/Deployment";
import { cloneDeep } from "lodash-es";
import podStore from "../../../../../../store/Pod";
import platformProjectStore from "../../../../../../store/PlatformProject";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 16,
  fontSize: "14px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,.125)",
  ...draggableStyle,
});

const PodTargetClusters = observer(({ open, onClose }) => {
  const {
    targetClusters,
    unselectedClusters,
    setTargetClusters,
    setUnselectedClusters,
    priority,
  } = podStore;
  const { loadAdminPlatformProjectList, adminList } = platformProjectStore;

  useEffect(() => {
    loadAdminPlatformProjectList();
  }, []);

  const [selectedClusters, setSelectedClusters] = useState([]);
  const [unselected, setUnselected] = useState([]);

  const move = (source, destination) => {
    if (source.droppableId === "unselected") {
      // 추가
      if (selectedClusters[destination.droppableId] === null) {
        selectedClusters[destination.droppableId] = unselected[source.index];
      } else if (
        typeof selectedClusters[destination.droppableId] === "string"
      ) {
        selectedClusters[destination.droppableId] = Array.of(
          selectedClusters[destination.droppableId],
          unselected[source.index]
        );
      } else {
        selectedClusters[destination.droppableId].push(
          unselected[source.index]
        );
      }
      setSelectedClusters([...selectedClusters]);
      //삭제
      setUnselected(unselected.filter((_, index) => index !== source.index));
    } else if (destination.droppableId === "unselected") {
      // 추가
      if (typeof selectedClusters[source.droppableId] === "string") {
        unselected.push(selectedClusters[source.droppableId]);
      } else {
        unselected.push(selectedClusters[source.droppableId][source.index]);
      }
      setUnselected([...unselected]);
      // 삭제
      if (typeof selectedClusters[source.droppableId] === "string") {
        selectedClusters[source.droppableId] = null;
      } else if (selectedClusters[source.droppableId].length === 2) {
        selectedClusters[source.droppableId] = selectedClusters[
          source.droppableId
        ].filter((_, index) => index !== source.index)[0];
      } else {
        selectedClusters[source.droppableId] = selectedClusters[
          source.droppableId
        ].filter((_, index) => index !== source.index);
      }
      setSelectedClusters([...selectedClusters]);
    } else {
      // 추가
      if (selectedClusters[destination.droppableId] === null) {
        if (typeof selectedClusters[source.droppableId] === "string") {
          selectedClusters[destination.droppableId] =
            selectedClusters[source.droppableId];
        } else {
          selectedClusters[destination.droppableId] =
            selectedClusters[source.droppableId][source.index];
        }
      } else if (
        typeof selectedClusters[destination.droppableId] === "string"
      ) {
        if (typeof selectedClusters[source.droppableId] === "string") {
          selectedClusters[destination.droppableId] = [
            selectedClusters[destination.droppableId],
            selectedClusters[source.droppableId],
          ];
        } else {
          selectedClusters[destination.droppableId] = [
            selectedClusters[destination.droppableId],
            selectedClusters[source.droppableId][source.index],
          ];
        }
      } else {
        if (typeof selectedClusters[source.droppableId] === "string") {
          selectedClusters[destination.droppableId].push(
            selectedClusters[source.droppableId]
          );
        } else {
          selectedClusters[destination.droppableId].push(
            selectedClusters[source.droppableId][source.index]
          );
        }
      }
      setSelectedClusters([...selectedClusters]);
      // 삭제
      if (typeof selectedClusters[source.droppableId] === "string") {
        selectedClusters[source.droppableId] = null;
      } else if (selectedClusters[source.droppableId].length === 2) {
        selectedClusters[source.droppableId] = selectedClusters[
          source.droppableId
        ].filter((_, index) => index !== source.index)[0];
      } else {
        selectedClusters[source.droppableId] = selectedClusters[
          source.droppableId
        ].filter((_, index) => index !== source.index);
      }
      setSelectedClusters([...selectedClusters]);
    }
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // 위치만 바꾸기
    } else {
      move(source, destination);
    }
  };

  const addLeveled = () => {
    if (priority.name === "GSelectedClusterPriority") {
      if (selectedClusters.length > 0) {
        return;
      }
    }
    setSelectedClusters([...selectedClusters, null]);
  };

  const closeTargetClusters = () => {
    onClose();
  };

  const applyTargetClusters = () => {
    console.log(targetClusters);
    setTargetClusters(selectedClusters.filter((element) => element !== null));
    setUnselectedClusters(unselected);
    onClose();
  };

  useEffect(() => {
    setSelectedClusters(cloneDeep(targetClusters));
    setUnselected(cloneDeep(unselectedClusters));
  }, [open]);

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Target Clusters"}
      onClose={onClose}
      bottomArea={false}
      modules={["custom"]}
    >
      <>
        <div style={{ width: "100%" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ fontSize: "16px", marginBottom: "10px" }}>
              <span style={{ marginRight: "15px" }}>Selected Cluster List</span>
              <ButtonNext onClick={addLeveled}>add leveled</ButtonNext>
            </div>
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
              {selectedClusters?.map((targetCluster, index) => (
                <Droppable droppableId={index.toString()}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        height: "150px",
                        width: "23%",
                        border: "1px solid lightgrey",
                        overflowY: "auto",
                        background: "#3965FF1A",
                        margin: "5px",
                        padding: "8px",
                      }}
                    >
                      {Array.isArray(targetCluster) ? (
                        targetCluster.map((item, index) => (
                          <Draggable
                            key={item}
                            draggableId={item}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {item}
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <Draggable
                          key={0}
                          draggableId={targetCluster}
                          index={0}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {targetCluster}
                            </div>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
            <div
              style={{
                fontSize: "16px",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Unselected Cluster List
            </div>
            <Droppable droppableId="unselected">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    height: "150px",
                    width: "23%",
                    border: "1px dotted lightgrey",
                    overflowY: "auto",
                    padding: "8px",
                  }}
                >
                  {unselected.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "300px",
              justifyContent: "center",
            }}
          >
            <Button onClick={closeTargetClusters}>취소</Button>
            <ButtonNext onClick={applyTargetClusters}>설정</ButtonNext>
          </div>
        </div>
      </>
    </CDialogNew>
  );
});

export default PodTargetClusters;
