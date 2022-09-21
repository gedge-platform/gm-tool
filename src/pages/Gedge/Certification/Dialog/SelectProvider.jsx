import React, { useEffect } from "react";
import { observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";
import certificationStore from "../../../../store/Certification";
import CreateCertification from "./CreateCertification";

const SelectProvider = observer((props) => {
  const { open } = props;
  const { loadCredentialList, setProviderName } = certificationStore;

  const ProviderList = ["AWS", "OPENSTACK"];

  const handleClose = () => {
    props.reloadFunc && props.reloadFunc();
    props.onClose && props.onClose();
  };

  const onChange = ({ target: { name, value } }) => {
    if (value === "AWS") setProviderName(value);
    else if (value === "OPENSTACK") setProviderName(value);
  };

  const onClickNext = () => {
    CreateCertification();
  };

  useEffect(() => {
    loadCredentialList();
    // console.log(ProviderName);
  }, []);

  return (
    <>
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              Select Provider Name
              <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="ProviderName" onChange={onChange}>
                  <option value={""}>Select Provider</option>
                  {ProviderList.map((provider) => (
                    <option value={provider}>{provider}</option>
                  ))}
                </select>
              </FormControl>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
export default SelectProvider;
