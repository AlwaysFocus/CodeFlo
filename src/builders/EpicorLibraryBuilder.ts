import { v4 as uuidv4 } from "uuid";
import { EpicorLibrary, LibraryReferenceEntity } from "models/epicorlibrary";
import { EpicorFunction } from "models";

export class EpicorLibraryBuilder {
  private OriginalID: string = "";
  private Description: string = "";
  private GlobalID: string = uuidv4().toString();
  private EpicorVersion: "4.2.100" = "4.2.100";
  private Revision: number = 1;
  private Published: boolean = false;
  private Private: boolean = false;
  private Disabled: boolean = false;
  private Mode: 0 | 1 | 2 = 0;
  private AllowCustomCodeWidgets: boolean = false;
  private AllowCustomCodeFunctions: boolean = false;
  private DirectDBAccess: 0 | 1 | 2 = 0;
  private Notes: string = "";
  private OwnedByCompany: string = "EPIC06";
  private Owner: string = "ewhalen";
  private LibraryReferences?: LibraryReferenceEntity[] | null = [];
  private Functions?: EpicorFunction[] | null = [];

  public build(): EpicorLibrary {
    return {
      originalID: this.OriginalID,
      description: this.Description,
      globalID: this.GlobalID,
      epicorVersion: this.EpicorVersion,
      revision: this.Revision,
      published: this.Published,
      private: this.Private,
      disabled: this.Disabled,
      mode: this.Mode,
      allowCustomCodeWidgets: this.AllowCustomCodeWidgets,
      allowCustomCodeFunctions: this.AllowCustomCodeFunctions,
      directDBAccess: this.DirectDBAccess,
      notes: this.Notes,
      ownedByCompany: this.OwnedByCompany,
      owner: this.Owner,
      libraryReferences: this.LibraryReferences,
      functions: this.Functions,
    };
  }

  public withOriginalID(value: string) {
    this.OriginalID = value;
    return this;
  }

  public withGlobalID(value: string) {
    this.GlobalID = value;
    return this;
  }

  public withEpicorVersion(value: "4.2.100") {
    this.EpicorVersion = value;
    return this;
  }

  public withRevision(value: number) {
    this.Revision = value;
    return this;
  }

  public withPublished(value: boolean) {
    this.Published = value;
    return this;
  }

  public withPrivate(value: boolean) {
    this.Private = value;
    return this;
  }

  public withDisabled(value: boolean) {
    this.Disabled = value;
    return this;
  }

  public withMode(value: 0 | 1 | 2) {
    this.Mode = value;
    return this;
  }

  public withAllowCustomCodeWidgets(value: boolean) {
    this.AllowCustomCodeWidgets = value;
    return this;
  }

  public withAllowCustomCodeFunctions(value: boolean) {
    this.AllowCustomCodeFunctions = value;
    return this;
  }

  public withDirectDBAccess(value: 0 | 1 | 2) {
    this.DirectDBAccess = value;
    return this;
  }

  public withNotes(value: string) {
    this.Notes = value;
    return this;
  }

  public withOwnedByCompany(value: string) {
    this.OwnedByCompany = value;
    return this;
  }

  public withOwner(value: string) {
    this.Owner = value;
    return this;
  }

  public withLibraryReferences(value: LibraryReferenceEntity[]) {
    this.LibraryReferences = value;
    return this;
  }

  public withEpicorFunctions(value: EpicorFunction[]) {
    this.Functions = value;
    return this;
  }

  public withAddEpicorFunction(value: EpicorFunction) {
    this.Functions?.push(value);
    return this;
  }

  public withRemoveEpicorFunction(value: EpicorFunction) {
    var index = this.Functions?.indexOf(value);
    if (index !== -1 || index !== undefined) {
      this.Functions?.splice(index as number, 1);
      return this;
    } else throw new Error("FunctionDefinition was not found in the array.");
  }
}
