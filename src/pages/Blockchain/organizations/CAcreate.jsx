import React, { useState, useEffect } from 'react';
import { CDialog } from "@/components/dialogs";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { swalConfirm } from "@/utils/swal-utils";
import FormControl from '@material-ui/core/FormControl';
import { CTextField } from "@/components/textfields";
import { CFileField } from "@/components/textfields/CFilefield";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import orgStore from '../../../Store/OrganizationStore';
import { observer } from "mobx-react";
import { useHistory } from "react-router";

const FormTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
    `;
const CAcreate = observer((props) => {
    const { open } = props;
    const [value, setValue] = useState('XML');
    const [caList, setCaList] = useState([])
    const [selectCa, setSelectCa] = useState("CA 데이터베이스 List");
    const handleClose = () => {
        props.onClose && props.onClose();
    };

    const handleCreateAlert = () => {
        swalConfirm("추가하시겠습니까??");
    }

    const handleChange = (event) => {
        let newlang = event.target.value;
        setValue(newlang);
        // i18n.changeLanguage(newlang);
    };
    const date = new Date();
    const handleChange2 = (event) => {
        orgStore.orgSelectCA = (event.target.value);

    };


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
            title={`CA 추가`}
            onClose={handleClose}
            onCustom={handleCreateAlert}
            modules={['custom', 'close']}
        >
            <FormTitle>CA 설정</FormTitle>
            <table className="tb_data tb_write">

                <tbody>
                    <tr>
                        <th style={{ width: "20%" }}>CA 이름</th>
                        <td>
                            <CTextField
                                id="template-name"
                                type="text"
                                placeholder="CA 이름"
                                className="form_fullWidth"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ width: "20%" }}>CA 데이터베이스</th>
                        <td>
                            <CSelectButton
                                placeholder="CA 이름"
                                className="form_fullWidth"
                                items={caList}
                            >
                                {selectCa}
                            </CSelectButton>

                        </td>
                    </tr>
                </tbody>
            </table>
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
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{ width: "20%" }}>CA 사용자(Orderer) PW</th>
                        <td>
                            <CTextField
                                id="template-mail"
                                type="text"
                                placeholder="CA 사용자(Orderer) PW"
                                className="form_fullWidth"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </CDialog >
    );
})
export default CAcreate;
