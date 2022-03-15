import React, { useState, useEffect, useLayoutEffect } from "react";
import { CDialog } from "@/components/dialogs";
import { swalUpdate } from "@/utils/swal-utils";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import { SERVER_URL } from "@/config.jsx";
import axios from "axios";
import { CButton } from "@/components/buttons";
import styled from "styled-components";
import { observer } from "mobx-react";
import VolumeYaml from "./VolumeYaml";
// import workspacesStore from "../../../../store/WorkSpace";
// import projectStore from "../../../../store/Project";
// // import DeploymentBasicInformation from "./DeploymentBasicInformation";
// import DeploymentPodSettins from "./DeploymentPodSettins";
// import deploymentStore from "../../../../store/Deployment";
// import DeploymentYaml from "./DeploymentYaml";

const Button = styled.button`
    background-color: ##eff4f9;
    border: 1px solid #ccd3db;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%);
`;

const ButtonNext = styled.button`
    background-color: #242e42;
    color: white;
    border: 1px solid #242e42;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%);
`;

const ViewDialog = observer((props) => {
    const { open, yaml } = props;
    console.log(yaml);
    const handleClose = () => {
        props.onClose && props.onClose();
    };

    const ViewOfComponent = () => {
        return (
            <>
                <VolumeYaml content={yaml} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button onClick={handleClose}>닫기</Button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <CDialog
            id="myDialog"
            open={open}
            maxWidth="md"
            title={"Create Deployment"}
            onClose={handleClose}
            bottomArea={false}
            modules={["custom"]}
        >
            {ViewOfComponent()}
        </CDialog>
    );
});
export default ViewDialog;
