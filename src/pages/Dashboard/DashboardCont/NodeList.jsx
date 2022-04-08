import { observer } from "mobx-react";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import clusterStore from "../../../store/Cluster";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2f3855",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const NodeList = observer(() => {
  const {
    clusterDetail: { nodes },
  } = clusterStore;

  console.log(nodes);
  return (
    <TableContainer component={Paper} style={{ overflow: "unset" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>IP</StyledTableCell>
            <StyledTableCell>Kube-Version</StyledTableCell>
            <StyledTableCell>OS</StyledTableCell>
            <StyledTableCell>Created</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <StyledTableRow key={node.name}>
              <StyledTableCell>{node.name}</StyledTableCell>
              <StyledTableCell>{node.type}</StyledTableCell>
              <StyledTableCell>{node.nodeIP}</StyledTableCell>
              <StyledTableCell>{node.kubeVersion}</StyledTableCell>
              <StyledTableCell>{node.os}</StyledTableCell>
              <StyledTableCell>{node.created_at}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default NodeList;
