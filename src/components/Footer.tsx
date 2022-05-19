import React from "react";
import { Container, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        Built by Eli Whalen
      </Typography>
    </Container>
  );
}
