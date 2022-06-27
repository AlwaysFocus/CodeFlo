import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EpicorLibraryDefinitionBuilder } from "builders/EpicorLibraryDefinitionBuilder";
import { EpicorLibrary } from "models/epicorlibrary";
import React, { useState } from "react";

export interface Props {
  setLibrarySummary: Function;
  showSnackbar: boolean;
}

const FunctionSummary: React.FunctionComponent<Props> = ({ setLibrarySummary, showSnackbar }) => {
  const libraryBuilder = new EpicorLibraryDefinitionBuilder();
  const libraryDefinition = libraryBuilder.build();

  const handleLibraryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFunctionLibrary({
      ...props.functionLibrary,
      [e.target.name]: e.target.value,
    });
  };

  const handleLibraryDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFunctionLibrary({
      ...props.functionLibrary,
      Library: {
        ...props.functionLibrary.Library,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleVersionChange = (e: SelectChangeEvent<string>) => {
    props.setFunctionLibrary({
      ...props.functionLibrary,
      [e.target.name]: e.target.value,
    });
  };

  const handleDBAccessChange = (e: SelectChangeEvent<number>) => {
    props.setFunctionLibrary({
      ...props.functionLibrary,
      Library: {
        ...props.functionLibrary.Library,
        [e.target.name]: e.target.value as number,
      },
    });
  };

  const handleCustomCodeWidgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFunctionLibrary({
      ...props.functionLibrary,
      Library: {
        ...props.functionLibrary.Library,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleCustomCodeFunctionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFunctionLibrary({
      ...props.functionLibrary,
      Library: {
        ...props.functionLibrary.Library,
        [e.target.name]: e.target.checked,
      },
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Library Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="libraryName"
            name="LibraryId"
            label="Library name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={props.functionLibrary.LibraryId}
            onChange={handleLibraryNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ minWidth: 130 }}>
            <InputLabel id="epicor-version-select-label">Epicor Version</InputLabel>
            <Select
              name="Version"
              labelId="epicor-version-select-label"
              id="epicor-version-select"
              value={props.functionLibrary.Version ?? "4.2.100"}
              onChange={handleVersionChange}
              label="Epicor Version"
              // defaultValue="4.2.100"
            >
              <MenuItem value="4.2.100">4.2.100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="functionDescription"
            name="Description"
            value={props.functionLibrary.Library.Description}
            onChange={handleLibraryDescriptionChange}
            label="Function description"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ minWidth: 180 }}>
            <InputLabel id="db-access-select-label">DB Access from Code</InputLabel>
            <Select
              labelId="db-access-select-label"
              id="db-access-select"
              name="DirectDBAccess"
              value={props.functionLibrary.Library.DirectDBAccess}
              onChange={handleDBAccessChange}
              label="DB Access from Code"
              defaultValue={0}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Read Only</MenuItem>
              <MenuItem value={2}>Read Write</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="AllowCustomCodeWidgets"
                checked={props.functionLibrary.Library.AllowCustomCodeWidgets}
                onChange={handleCustomCodeWidgetChange}
              />
            }
            label="Custom Code Widgets"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="AllowCustomCodeFunctions"
                checked={props.functionLibrary.Library.AllowCustomCodeFunctions}
                onChange={handleCustomCodeFunctionChange}
              />
            }
            label="Custom Code Functions"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="internalUseOnly" value="no" />}
            label="For Internal Use Only"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="debugMode" value="no" />}
            label="Debug Mode"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="dumpSources" value="no" />}
            label="Dump Sources"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FunctionSummary;
