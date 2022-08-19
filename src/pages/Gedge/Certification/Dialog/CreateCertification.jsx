import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { CDialogNew } from "../../../../components/dialogs";
import FormControl from "@material-ui/core/FormControl";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import { swalError } from "../../../../utils/swal-utils";

const CreateCertification = observer((props) => {
  const { open } = props;
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
    domainName: "",
    projectID: "",
    endPointAddress: "",
  });

  const { userName, password, domainName, projectID, endPointAddress } = inputs;

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
    setInputs({
      userName: "",
      password: "",
      domainName: "",
      projectID: "",
      endPointAddress: "",
    });
  };

  const onChange = ({ target: { value } }) => {
    setInputs({
      ...inputs,
    });
  };

  const createCertification = async () => {
    const result = await postCretification(inputs);
    handleClose();
  };

  return <CDialogNew></CDialogNew>;
});
export default CreateCertification;
