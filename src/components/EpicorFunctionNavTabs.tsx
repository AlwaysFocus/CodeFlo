import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

export default function EpicorFunctionNavTabs() {
  const match = useRouteMatch();

  // Route Lookup for tabs
  const navUrls: any = {
    "/": 0,
    "/epicor-functions": 0,
    // "/epicor-functions/contacts": 1,
    // "/epicor-functions/personal": 2,
  };

  // Set selected tab based on url
  const [value, setValue] = React.useState(navUrls[match.url]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="secondary"
      centered
      // data-test="nav-transaction-tabs"
      data-test="nav-epicor-function-tabs"
    >
      <Tab
        label="My Functions"
        component={Link}
        to="/epicor-functions"
        data-test="nav-public-tab"
      />
      {/* <Tab
        label="Friends"
        component={Link}
        to="/epicor-functions/contacts"
        data-test="nav-contacts-tab"
      />
      <Tab
        label="Mine"
        component={Link}
        to="/epicor-functions/personal"
        data-test="nav-personal-tab"
      /> */}
    </Tabs>
  );
}
