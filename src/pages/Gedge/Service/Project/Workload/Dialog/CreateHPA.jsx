import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";
import { CTextField } from "@/components/textfields";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";
import deploymentStore from "../../../../../../store/Deployment";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const CreateHPA = observer((props) => {
	const {
		hpaWorkspaceList,
		hpaProjectList,
		hpaClusterList,
		hpaDeploymentList
  } = deploymentStore;
  const { open } = props;
	const [ isCpuDisabled, setIsCpuDisabled ] = useState(true);
	const [ isMemoryDisabled, setIsMemoryDisabled ] = useState(true);
	const [ hpaInfo, setHpaInfo ] = useState({
		minReplica: 1,
		maxReplica: 1,
		cpu: 0,
		memory: 0
	});

	const onChangeWorkspace = (e) => {
		//Get Project From Workspace
		setHpaInfo({
			...hpaInfo,
			[e.target.name]: e.target.value
		});
	}

	const onChangeProject = (e) => {
		//Get Cluster From Project
	}

	const onChangeCluster = (e) => {
		//Get Deployment From Cluster
	}

	const onChangeInput = (e) => {
		setHpaInfo({
			...hpaInfo,
			[e.target.name]: e.target.value
		});
	}

	const onChangeCpuCheckBox = (e) => {
		setIsCpuDisabled(!e.target.checked);
	}

	const onChangeMemoryCheckBox = (e) => {
		setIsMemoryDisabled(!e.target.checked);
	}

	const handleClose = () => {
    props.onClose && props.onClose();
		setIsCpuDisabled(true);
		setIsMemoryDisabled(true);
	}

	const createHPA = () => {
		const YAML = require("json-to-pretty-yaml");
		console.log(YAML.stringify({
			apiVersion: "autoscaling/v2beta2",
			kind: "HorizontalPodAutoscaler",
			metadata: {
				name: hpaInfo.name,
				namespace: hpaInfo.workspace
			},
			spec: {
				scaleTargetRef: {
					apiVersion: "apps/v1",
					kind: "Deployment",
					name: hpaInfo.deployment
				},
				minReplica: hpaInfo.minReplica,
				maxReplica: hpaInfo.maxReplica,
				metrics: [
					{
						type: "Resource",
						resource: {
							name: "cpu",
							target: {
								type: "Utilization",
								averageUtilization: hpaInfo.cpu
							}
						}
					},
					{
						type: "Resource",
						resource: {
							name: "memory",
							target: {
								type: "AverageValue",
								averageUtilization: hpaInfo.memory+"Mi"
							}
						}
					}
				]
			}
		}))
	}

	const CreateHPAComponent = () => {
		return(
			<>
				<table className="tb_data_new tb_write">
					<tbody>
						<tr>
							<th>
								Workspace <span className="requried">*</span>
							</th>
							<td colSpan="3">
								<FormControl className="form_fullWidth">
									<select name="workspace" defaultValue={""} onChange={onChangeWorkspace}>
										<option value={""} disabled hidden>Select Workspace</option>
										{hpaWorkspaceList.map((workspace) => (
											<option value={workspace.name}>{workspace.name}</option>
										))}
									</select>
								</FormControl>
							</td>
						</tr>
						<tr>
							<th>
								Project <span className="requried">*</span>
							</th>
							<td colSpan="3">
								<FormControl className="form_fullWidth">
									<select name="project" defaultValue={""} onChange={onChangeProject}>
										<option value={""} disabled hidden>Select Project</option>
										{hpaProjectList.map((project) => (
											<option value={project.name}>{project.name}</option>
										))}
									</select>
								</FormControl>
							</td>
						</tr>
						<tr>
							<th>
								Cluster <span className="requried">*</span>
							</th>
							<td colSpan="3">
								<FormControl className="form_fullWidth">
									<select name="cluster" defaultValue={""} onChange={onChangeCluster}>
										<option value={""} disabled hidden>Select Cluster</option>
										{hpaClusterList.map((cluster) => (
											<option value={cluster.name}>{cluster.name}</option>
										))}
									</select>
								</FormControl>
							</td>
						</tr>
						<tr>
							<th>
								Deployment <span className="requried">*</span>
							</th>
							<td colSpan="3">
								<FormControl className="form_fullWidth">
									<select name="deployment" defaultValue={""} onChange={onChangeInput}>
										<option value={""} disabled hidden>Select Deployment</option>
										{hpaDeploymentList.map((deployment) => (
											<option value={deployment.name}>{deployment.name}</option>
										))}
									</select>
								</FormControl>
							</td>
						</tr>
						<tr>
							<th>
								Name <span className="requried">*</span>
							</th>
							<td>
								<CTextField type="text" placeholder="HPA Name" className="form_fullWidth" name="name" onChange={onChangeInput} />
							</td>
						</tr>
						<tr >
							<th>
								Replica <span className="requried">*</span>
							</th>
							<td style={{ display: "flex", alignItems: "center"}}>
								<span style={{ marginLeft: "5px", marginRight: "5px"}}>MIN:</span>
								<CTextField type="number" className="form_fullWidth" name="minReplica" onChange={onChangeInput} value={1} style={{ width: "15%"}}/>
								<span style={{ marginLeft: "15px", marginRight: "5px"}}>MAX:</span>
								<CTextField type="number" className="form_fullWidth" name="maxReplica" onChange={onChangeInput} value={1} style={{ width: "15%"}}/>
							</td>
						</tr>
						<tr>
							<th rowSpan={3}>
								Resource <span className="requried">*</span>
							</th>
						</tr>
						<tr>
							<td style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" name="CPU" onChange={onChangeCpuCheckBox} style={{ marginLeft: "5px", marginRight: "5px" }}/>
								<span style={{ width: "8%"}}>CPU</span>
								<CTextField type="number" name="cpu" value={0} disabled={isCpuDisabled} onChange={onChangeInput} style={{ marginLeft: "5px", marginRight: "5px", width: "15%" }}/>%
							</td>
						</tr>
						<tr>
							<td style={{ display: "flex", alignItems: "center"}}>
								<input type="checkbox" name="MEMORY" onChange={onChangeMemoryCheckBox} style={{ marginLeft: "5px", marginRight: "5px" }}/>
								<span style={{ width: "8%"}}>MEMORY</span>
								<CTextField type="number" name="memory" value={0} disabled={isMemoryDisabled} onChange={onChangeInput} style={{ marginLeft: "5px", marginRight: "5px", width: "15%"}}/>Mi
							</td>
						</tr>
					</tbody>
				</table>

				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginTop: "32px",
					}}
      	>
					<div
						style={{
							display: "flex",
							width: "300px",
							justifyContent: "center",
						}}
					>
						<Button onClick={handleClose}>취소</Button>
						<ButtonNext onClick={createHPA}>생성</ButtonNext>
					</div>
      	</div>
			</>
		)
	}

	return(
		<CDialogNew
			id="myDialog"
			open={open}
			maxWidth="md"
			title={"Create HPA"}
			onClose={handleClose}
			bottomArea={false}
			modules={["custom"]}
		>
			{CreateHPAComponent()}
		</CDialogNew>
	)
});
export default CreateHPA;