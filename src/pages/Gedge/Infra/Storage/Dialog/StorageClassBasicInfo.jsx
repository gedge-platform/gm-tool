import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CTextField } from "../../../../../components/textfields";
import { FormControl } from "@material-ui/core";
import StorageClassStore from "../../../../../store/StorageClass";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
`;

const StorageClassBasicInfo = observer(() => {
  const {
    storageClassName,
    setStorageClassName,
    storageSystem,
    setStorageSystem,
    volumeExpansion,
    setVolumeExpansion,
    reclaimPolicy,
    setReclaimPolicy,
    accessMode,
    setAccessMode,
    volumeBindingMode,
    setVolumeBindingMode,
  } = StorageClassStore;

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    if (name === "storageClassName") {
      setStorageClassName(value);
    }
    if (name === "storageSystem") {
      setStorageSystem(value);
    }
    if (name === "volumeExpansion") {
      setVolumeExpansion(value);
    }
    if (name === "reclaimPolicy") {
      setReclaimPolicy(value);
    }
    if (name === "accessMode") {
      setAccessMode(value);
    }
    if (name === "volumeBindingMode") {
      setVolumeBindingMode(value);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step current">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>고급 설정</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>설정 검토</span>
          </div>
        </div>
      </div>
      <table className="tb_data_new tb_write">
        <tbody>
          <tr>
            <th>
              StorageClass Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="StorageClass Name"
                className="form_fullWidth"
                name="storageClassName"
                onChange={onChange}
                value={storageClassName}
              />
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Storage System <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="storageSystem" onChange={onChange}>
                  <option value="">Select Storage System</option>
                  <option value="Ceph">Ceph</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Volume Expansion<span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="volumeExpansion" onChange={onChange}>
                  <option value="">Select Volume Expansion</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              Reclaim Policy <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="reclaimPolicy" onChange={onChange}>
                  <option value="">Select Reclaim Policy</option>
                  <option value="Delete">Delete</option>
                  <option value="Retain">Retain</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>Access Mode</th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="accessMode" onChange={onChange}>
                  <option value="">Select Access Mode</option>
                  <option value="ReadWriteOnce">ReadWriteOnce</option>
                  <option value="ReadOnlyMany">ReadOnlyMany</option>
                  <option value="ReadWriteMany">ReadWriteMany</option>
                  <option value="ReadWriteOncePod">ReadWriteOncePod</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>
              VolumeBinding Mode <span className="requried">*</span>
            </th>
            <td>
              <FormControl className="form_fullWidth">
                <select name="volumeBindingMode" onChange={onChange}>
                  <option value="">Select VolumeBinding Mode</option>
                  <option value="Immediate">Immediate</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </FormControl>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>Pool</th>
            <td>
              <CTextField
                type="text"
                placeholder="Pool"
                className="form_fullWidth"
                name="Pool"
                onChange={onChange}
                // value={StorageClassName}
              />
            </td>
            <th></th>
          </tr>
          <tr>
            <th>UserSecretName</th>
            <td>
              <CTextField
                type="text"
                placeholder="UserSecretName"
                className="form_fullWidth"
                name="userSecretName"
                onChange={onChange}
                // value={StorageClassName}
              />
            </td>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
});

export default StorageClassBasicInfo;
