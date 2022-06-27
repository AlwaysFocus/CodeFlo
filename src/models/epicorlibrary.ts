import { EpicorFunction } from "./epicorfunction";

export interface EpicorLibrary {
  originalID: string;
  description: string;
  globalID: string;
  epicorVersion: "4.2.100";
  revision: number;
  published: boolean;
  private: boolean;
  disabled: boolean;
  mode: 0 | 1 | 2;
  allowCustomCodeWidgets: boolean;
  allowCustomCodeFunctions: boolean;
  directDBAccess: 0 | 1 | 2;
  notes: string;
  ownedByCompany: string;
  owner: string;
  libraryReferences?: LibraryReferenceEntity[] | null;
  functions?: EpicorFunction[] | null;
}

export interface LibraryReferenceEntity {
  referenceType: number;
  referenceID: string;
  updatable?: boolean | null;
}
