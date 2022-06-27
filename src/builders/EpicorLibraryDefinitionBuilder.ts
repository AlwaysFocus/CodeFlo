import { EpicorLibrary } from "models/epicorlibrary";
import { EpicorLibraryDefinition } from "models/epicorlibrarydefinition";
import { EpicorLibraryBuilder } from "./EpicorLibraryBuilder";

export class EpicorLibraryDefinitionBuilder {
  private Mode: "Backup" = "Backup";
  private Version: "4.2.100" = "4.2.100";
  private SystemCode: "ERP" = "ERP";
  private LibraryId: string = "";
  private Library: EpicorLibrary = new EpicorLibraryBuilder().build();

  public build(): EpicorLibraryDefinition {
    return {
      mode: this.Mode,
      version: this.Version,
      systemCode: this.SystemCode,
      libraryId: this.LibraryId,
      library: this.Library,
    };
  }

  public withMode(value: "Backup") {
    this.Mode = value;
    return this;
  }

  public withVersion(value: "4.2.100") {
    this.Version = value;
    return this;
  }

  public withSystemCode(value: "ERP") {
    this.SystemCode = value;
    return this;
  }

  public withLibraryId(value: string) {
    this.LibraryId = value;
    return this;
  }

  public withLibrary(value: EpicorLibrary) {
    this.Library = value;
    return this;
  }
}
