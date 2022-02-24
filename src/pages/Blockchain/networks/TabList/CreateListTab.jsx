import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import networkStore from '../../../../Store/NetworkStore';

const CreateListTab = observer((props) => {

    const { columns, rows, state } = props

    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
        const listidx = Object.keys(model)[0]
        const temp = Object.values(model)[0]
        const listKey = Object.keys(temp)[0]
        const listValue = Object.values(temp)[0].value
        if (state === "orderer") {
            networkStore.ordererList[listidx][listKey] = listValue
        } else if (state === "peer") {
            networkStore.peerList[listidx][listKey] = listValue
        }
    }, []);
    const handleRowsModelSelect = React.useCallback((ids) => {
        // console.log(ids)
        if (state === "orderer") {
            networkStore.curSelOderer = ids
        } else if (state === "peer") {
            networkStore.curSelPeer = ids
        }
        // delete networkStore.ordererList[ids[0]]
        // console.log(networkStore.ordererList, "networkStore.ordererList")
    }, []);
    //     console.log(selectedRows)
    const handleRowsModelSelectable = React.useCallback((data) => {
        console.log(data)
    }, []);
    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        {state === "channel" ?
                            <>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    rowLength={5}

                                />
                            </> :
                            <>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    rowLength={5}

                                    editRowsModel={editRowsModel}
                                    onEditRowsModelChange={handleEditRowsModelChange}
                                    checkboxSelection="true"
                                    onSelectionModelChange={handleRowsModelSelect}
                                />
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    );

})
export default CreateListTab;
