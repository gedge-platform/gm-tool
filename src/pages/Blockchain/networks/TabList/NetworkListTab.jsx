import React, { useState, useEffect } from 'react';
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from '@/components/common/CommActionBar';
import { AgGrid } from '@/components/datagrids'
import { agDateColumnFilter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import LogDialog from '../Dialog/LogDialog';
import CreateDialog from '../Dialog/CreateDialog';
import { swalConfirm } from "@/utils/swal-utils";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import moment from "moment";
import { useHistory } from "react-router";

import NetworkDetail from "../NetworkDetail";
import { observer } from 'mobx-react';
import networkStore from '../../../../Store/NetworkStore';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.8, 0, 0.8, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        backgroundColor: "white"
    },
}));

const APIListTab = observer(() => {
    const [row, setRow] = React.useState({})
    const [rowData, setRowData] = useState(networkStore.netList);
    const [columnDefs] = useState([
        {
            headerName: '',
            field: 'check',
            minWidth: 53,
            maxWidth: 53,
            filter: false,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: "네트워크 이름",
            field: "name",
            filter: false,
            sortable: false,
        },
        {
            headerName: "블록체인 버전",
            field: "version",
            filter: false,
            sortable: false,
        },
        {
            headerName: "Organization",
            field: "organization",
            filter: false,
            sortable: false,
        },
        {
            headerName: "Channel",
            field: "channel",
            filter: false,
            sortable: false,
        },
        {
            headerName: "Orderer",
            field: "orderer",
            filter: false,
            sortable: false,
        },
        {
            headerName: "Peer",
            field: "peer",
            filter: false,
            sortable: false,
        },
        {
            headerName: "생성 일시",
            field: "created_at",
            filter: false,
            sortable: false,
            cellRenderer: (date) => {
                return `<span>${moment(new Date(date.value)).format(
                    "YYYY-MM-DD HH:mm"
                )}</span>`;
            },
        },
        {
            headerName: "상태",
            field: "state",
            filter: false,
            sortable: false,
            cellRenderer: function (state) {
                if (state.data.state == "1") {
                    return `<span class="state_ico state_02">운영중</span>`;
                }
                return `<span class="state_ico state_04">삭제중</span>`;
            },
        },
    ]);

    useEffect(() => {
        networkStore.getNetworkList()
        console.log(networkStore.netList, "test")
    }, [])

    const history = useHistory();
    const networkCreate = () => {
        history.push('/network/create');
    }

    const networkDelete = () => {
        return Swal.fire({
            text: "삭제하시겠습니까?",
            width: 270,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                networkStore.deleteNetwork(networkStore.selectNetwork.name)
                handleClose()
            } else if (result.isDenied) {

                console.log("취소")
            }
        });
    }

    const [view, setView] = React.useState(false)

    const handleSearch = () => {
        setView(!view)
        // console.log("검색")
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);

    };
    const totalElements = rowData.length;
    const rowPerPage = 15
    const totalPages = Math.ceil(totalElements / rowPerPage);
    const [currentTablePage, setCurrentTablePage] = React.useState(1);

    const goPrevPage = () => {
        if (currentTablePage > 1) {
            setCurrentTablePage(currentTablePage - 1)
        }
        // console.log("이전 페이지")
    }

    const goNextPage = () => {
        if (currentTablePage < totalPages) {
            setCurrentTablePage(currentTablePage + 1)
        }
        // console.log("다음 페이지")
    }

    const onCellClicked = (e) => {
        // console.log(e.data)

        networkStore.setClickNetwork(e.data)
        // networkStore.selectNetwork
        // setRows(e.data)
        // console.log(e.rowIndex)

        // networkStore.selectNetwork = rowData[e.rowIndex]
    }
    // const searchText = (e) => {
    //     console.log(e)
    //     // let text = e.target.value
    //     console.log(rows.filter(row => (row.name).includes(e)))
    //     const searchData = rows.filter(row => (row.name).includes(e))
    //     setRowData(searchData)
    // }

    return (
        <>
            <CReflexBox>
                <PanelBox>
                    <div className="panelTitBar panelTitBar_clear">
                        <div className="tit">네트워크 리스트</div>
                    </div>
                    <div className="panelTitBar panelTitBar_clear">
                        <div style={{ display: "flex" }}>
                            <div>
                                {/* <Search>
                                    <SearchIconWrapper >
                                        <IconButton size="small" aria-label="search" color="inherit" onClick={handleSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </SearchIconWrapper>
                                    {view === true ? <StyledInputBase
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e) => console.log(e.target.value)}
                                    /> : <></>}
                                </Search> */}
                                {view === true ? <Search>
                                    <SearchIconWrapper >
                                        <IconButton size="small" aria-label="search" color="inherit" onClick={handleSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e) => searchText(e.target.value)}
                                    /> </Search> : <IconButton size="small" aria-label="search" color="inherit" onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>}

                            </div>
                            <div>
                                <CommActionBar reloadFunc={networkStore.getNetworkList} />
                                {/* <IconButton size="small" aria-label="search" color="inherit" onClick={handleRenew}>
                                    <AutorenewIcon />
                                </IconButton> */}
                            </div>
                        </div>

                        <div>
                            <Button startIcon={<AddIcon />} onClick={networkCreate}>네트워크 생성</Button>
                            <Button color="error" startIcon={<DeleteIcon />} onClick={networkDelete}>네트워크 삭제</Button>
                        </div>
                    </div>
                    <div style={{ height: "100%" }}>
                        <AgGrid
                            rowData={networkStore.netList}
                            columnDefs={columnDefs}
                            totalElements={totalElements}
                            totalPages={totalPages}
                            currentPage={currentTablePage}
                            goPrevPage={goPrevPage}
                            goNextPage={goNextPage}
                            onCellClicked={onCellClicked}
                            rowPerPage={rowPerPage}
                        />
                    </div>
                </PanelBox>
                <NetworkDetail />
            </CReflexBox>
        </>
    );
})
export default APIListTab;
