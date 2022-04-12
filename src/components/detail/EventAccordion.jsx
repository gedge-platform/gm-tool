import React from "react";
import styled from "styled-components";
import { dateFormatter, strFormatByLength } from "@/utils/common-utils";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import theme from "@/styles/theme";

const EventsContainer = styled.div`
  margin: 8px 8px;
  padding: 12px 12px;
  background-color: #141a30;
`;

const EventAccordion = ({ events }) => {
  if (events.length < 1)
    return <EventsContainer>No Events Info.</EventsContainer>;
  return (
    <div className="tb_container">
      <table className="tb_data">
        <tbody>
          {events.map(
            ({
              message,
              kind,
              name,
              namespace,
              cluster,
              reason,
              type,
              eventTime,
            }) => (
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreRoundedIcon
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      />
                    }
                    aria-controls="ProjectEvent-content"
                    id="ProjectEvent-header"
                    sx={{ bgcolor: theme.colors.primaryDark }}
                  >
                    <Typography
                      sx={{
                        width: "10%",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      Message
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {strFormatByLength(message)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: theme.colors.panelTit }}>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.7)",
                        bgcolor: theme.colors.primary,
                      }}
                    >
                      <table className="tb_data">
                        <tr>
                          <th>Kind</th>
                          <td>{kind}</td>
                          <th>Name</th>
                          <td>{name}</td>
                        </tr>
                        <tr>
                          <th>Namespace</th>
                          <td>{namespace}</td>
                          <th>Cluster</th>
                          <td>{cluster}</td>
                        </tr>
                        <tr>
                          <th>Reason</th>
                          <td>{reason}</td>
                          <th>Type</th>
                          <td>{type}</td>
                        </tr>
                        <tr>
                          <th>Event Time</th>
                          <td>{dateFormatter(eventTime)}</td>
                          <th></th>
                          <td></td>
                        </tr>
                      </table>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventAccordion;
