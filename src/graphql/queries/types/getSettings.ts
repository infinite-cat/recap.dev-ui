/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSettings
// ====================================================

export interface getSettings_getSettings {
  __typename: "Settings";
  id: number | null;
  isAwsIntegrationEnabled: boolean;
  host: string;
  cleanupAfterDays: number | null;
  notificationConfigurations: any | null;
}

export interface getSettings {
  getSettings: getSettings_getSettings;
}
