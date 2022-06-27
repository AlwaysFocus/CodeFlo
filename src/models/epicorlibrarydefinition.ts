import { EpicorLibrary } from "./epicorlibrary";

export interface EpicorLibraryDefinition {
  mode: "Backup";
  version: "4.2.100";
  systemCode: "ERP";
  libraryId: string;
  library: EpicorLibrary;
}
