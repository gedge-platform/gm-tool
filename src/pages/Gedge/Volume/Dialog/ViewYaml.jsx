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
    const { open, pVolume } = props;

    console.log(pVolume);

    return null;
});
export default ViewDialog;
