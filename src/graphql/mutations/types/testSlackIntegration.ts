/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: testSlackIntegration
// ====================================================

export interface testSlackIntegration_testSlackIntegration {
  __typename: "IntegrationTestResult";
  success: boolean;
  error: string | null;
}

export interface testSlackIntegration {
  testSlackIntegration: testSlackIntegration_testSlackIntegration;
}

export interface testSlackIntegrationVariables {
  channelId: string;
  token: string;
}
