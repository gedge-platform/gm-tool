import React, { useState, useEffect } from 'react';
import { CDialog } from "@/components/dialogs";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
// import { swalConfirm } from "@/utils/swal-utils";
import Swal from "sweetalert2";
import FormControl from '@material-ui/core/FormControl';
import { CTextField } from "@/components/textfields";
import { CFileField } from "@/components/textfields/CFilefield";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import orgStore from '../../../../Store/OrganizationStore';
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import networkStore from '../../../../Store/NetworkStore';

const FormTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
    `;
const OrdererAdd = observer((props) => {
    const { open } = props;
    const [value, setValue] = useState('XML');
    const [caList, setCaList] = useState([])
    const [caUser, setCaUser] = useState("")
    const [caPw, setCaPw] = useState("")
    const [cpu, setCpu] = useState(0.35)
    const [memory, setMemory] = useState(700)
    const [storage, setStorage] = useState(100)
    const [selectCa, setSelectCa] = useState("CA 데이터베이스 List");
    const handleClose = () => {
        props.onClose && props.onClose();
        setCaUser("")
        setCaPw("")
        setCpu(0.35)
        setMemory(700)
        setStorage(100)
    };
    const inputProps = { min: 0, max: 100000 }
    const handleCreateAlert = () => {
        return Swal.fire({
            text: "추가하시겠습니까?",
            width: 270,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                const caInfo = {
                    caUser: caUser,
                    caPw: caPw,
                    cpu: cpu,
                    memory: memory,
                    storage: storage,
                }
                // networkStore.caInfo = caInfo
                // console.log(networkStore.caInfo, "networkStore.caInfo")
                networkStore.ordererList.push(caInfo)
                // Swal.fire('Confirmed', '', 'success')
                handleClose()
            } else if (result.isDenied) {

                console.log("취소")
            }
        });
        // swalConfirm("추가하시겠습니까??");
    }


    useEffect(() => {

        orgStore.orgCAList.map((option) => {
            const list = {
                name: option.value,
                onClick: () => {
                    console.log(option.value)
                    setSelectCa(option.value)
                }
            }
            setCaList(caList => [...caList, list])
        })
        return () => { }
    }, [])
    // {
    //     name: '사용자',
    //     // onClick: () => {

    //     // },
    // },
    // {
    //     name: '관리자',
    //     // onClick: () => {
    //     // },
    // },

    return (
        <CDialog
            id="myDialog"
            open={open}
            maxWidth="sm"
            title={`Orderer 추가`}
            onClose={handleClose}
            onCustom={handleCreateAlert}
            modules={['custom', 'close']}
        >
            <FormTitle>Orderer 사용자 설정</FormTitle>
            <table className="tb_data tb_write">
                <tbody>
                    <tr>
                        <th style={{ width: "20%" }}>CA 사용자(Orderer) ID</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="text"
                                placeholder="CA 사용자(Orderer) ID"
                                className="form_fullWidth"
                                onChange={(e) => { setCaUser(e.target.value) }}
                                value={caUser} f
                            />
                        </td>
                        <th style={{ width: "20%" }}>CA 사용자(Orderer) PW</th>
                        <td>
                            <CTextField
                                id="template-mail"
                                type="text"
                                placeholder="CA 사용자(Orderer) PW"
                                className="form_fullWidth"
                                onChange={(e) => { setCaPw(e.target.value) }}
                                value={caPw}
                            />
                        </td>
                    </tr>

                </tbody>
            </table>
            <div style={{ margin: "20px" }}></div>
            <FormTitle>Orderer 자원 설정</FormTitle>
            <table className="tb_data tb_write">
                <tbody>
                    <tr>
                        <th style={{ width: "20%" }}>CPU(core)</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="number"
                                inputProps={inputProps}
                                placeholder="CORE"
                                className="form_fullWidth"
                                onChange={(e) => { setCpu(Number(e.target.value)) }}
                                value={cpu}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ width: "20%" }}>Memory(MB)</th>
                        <td>
                            <CTextField
                                id="template-mail"
                                type="number"
                                inputProps={inputProps}
                                placeholder="MB"
                                className="form_fullWidth"
                                onChange={(e) => { setMemory(Number(e.target.value)) }}
                                value={memory}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ width: "20%" }}>Storage(GB)</th>
                        <td>
                            <CTextField
                                id="template-mail"
                                type="number"
                                placeholder="GB"
                                inputProps={inputProps}
                                className="form_fullWidth"
                                onChange={(e) => { setStorage(Number(e.target.value)) }}
                                value={storage}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </CDialog >
    );
})
export default OrdererAdd;
