/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setAwsIntegration
// ====================================================

export interface setAwsIntegration_setAwsIntegration {
  __typename: "Settings";
  id: number | null;
  isAwsIntegrationEnabled: boolean;
}

export interface setAwsIntegration {
  setAwsIntegration: setAwsIntegration_setAwsIntegration;
}

export interface setAwsIntegrationVariables {
  enabled: boolean;
}
