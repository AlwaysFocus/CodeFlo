export interface EpicorConnection {
  name: string;
  id: string;
  uuid: string;
  userId: string;
  epicorUrl: string;
  epicorApiKey: string;
  epicorUsername: string;
  epicorPassword: string;
  isDeleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export type EpicorConnectionPayload = Pick<
  EpicorConnection,
  "name" | "userId" | "epicorUrl" | "epicorApiKey" | "epicorUsername" | "epicorPassword"
>;
