import React, { useState } from "react";
import { CTextField } from "@/components/textfields";
import { observer } from "mobx-react";
import deploymentStore from "../../../../store/Deployment";
import podStore from "../../../../store/Pod";

const PodSettings = observer(() => {
  const {
    containerName,
    containerPort,
    containerPortName,
    containerImage,
    setContainerName,
    setContainerPort,
    setContainerPortName,
    setContainerImage,
  } = podStore;

  const onChange = (e, type) => {
    const { value, name } = e.target;
    switch (name) {
      case "Container Name":
        setContainerName(value);
        break;
      case "Container Image":
        setContainerImage(value);
        break;
      case "Container Port Name":
        setContainerPortName(value);
        break;
      case "Container Port":
        setContainerPort(value);
        break;
    }
  };

  return (
    <div>
      <table className="tb_data tb_write">
        <tbody>
          <tr>
            <th>
              Container Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Container Name"
                className="form_fullWidth"
                name="Container Name"
                onChange={onChange}
                value={containerName}
              />
            </td>
            <th>
              Container Image
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Container Image"
                className="form_fullWidth"
                name="Container Image"
                onChange={onChange}
                value={containerImage}
              />
            </td>
          </tr>

          <tr>
            <th>
              Container Port Name
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="text"
                placeholder="Container Port Name"
                className="form_fullWidth"
                name="Container Port Name"
                onChange={onChange}
                value={containerPortName}
              />
            </td>
            <th>
              Container Port
              <span className="requried">*</span>
            </th>
            <td>
              <CTextField
                type="number"
                placeholder="Container Port"
                className="form_fullWidth"
                name="Container Port"
                onChange={onChange}
                value={containerPort}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default PodSettings;
