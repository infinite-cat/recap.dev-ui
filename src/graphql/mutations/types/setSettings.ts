/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SettingsInput } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: setSettings
// ====================================================

export interface setSettings_setSettings {
  __typename: "Settings";
  id: number | null;
  isAwsIntegrationEnabled: boolean;
  host: string;
  notificationConfigurations: any | null;
}

export interface setSettings {
  setSettings: setSettings_setSettings;
}

export interface setSettingsVariables {
  settings: SettingsInput;
}
