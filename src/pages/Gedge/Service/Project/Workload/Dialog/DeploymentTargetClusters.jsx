import { observer } from "mobx-react";
import { CDialogNew } from "@/components/dialogs";


const DeploymentTargetClusters = observer((props) => {
  const { open } = props;




  const handleClose = () => {
    props.onClose && props.onClose();
  };

  return(
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Target Clusters"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >

    </CDialogNew>
  )
})

export default DeploymentTargetClusters;