import produce from "immer";
import { EpicorLibrary } from "models/epicorlibrary";
import { EpicorLibraryDefinition } from "models/epicorlibrarydefinition";
import { createMachine, assign } from "xstate";

export interface CreateEpicorLibraryMachineSchema {
  states: {
    "Creating Library": {};
    "Saving Library State": {};
    "Reference Modal Open": {};
    "Function Modal Open": {};
  };
}

export const createEpicorLibraryMachine = createMachine(
  {
    schema: {
      // Machine context
      context: {} as { library: EpicorLibraryDefinition },
      // Events used in this machine
      events: {} as
        | { type: "SAVE_LIBRARY_TO_DB" }
        | { type: "ADD_REFERENCE_TO_LIBRARY" }
        | { type: "ADD_FUNCTION_TO_LIBRARY" }
        | { type: "TYPE_IN_LIBRARY_INFO" },
    },
    id: "New Library Machine",
    initial: "Creating Library",
    states: {
      "Creating Library": {
        initial: "Library inputs are empty",
        states: {
          "Library inputs are empty": {},
          "Library inputs have values": {
            on: {
              SAVE_LIBRARY_TO_DB: {
                target: "Saving Library State",
              },
              ADD_REFERENCE_TO_LIBRARY: {
                target: "#New Library Machine.Reference Modal Open",
              },
              ADD_FUNCTION_TO_LIBRARY: {
                target: "#New Library Machine.Function Modal Open",
              },
            },
          },
          "Saving Library State": {
            invoke: {
              src: "Save Library to Database",
              onError: [
                {
                  actions: "Show Error Toast",
                  target: "Library inputs have values",
                },
              ],
              onDone: [
                {
                  actions: ["Show Success Toast", "Clear Local State"],
                  target: "Library inputs are empty",
                },
              ],
            },
          },
        },
        on: {
          TYPE_IN_LIBRARY_INFO: [
            {
              actions: "setEpicorLibraryDetail",
              cond: "Values have length greater that zero",
              target: ".Library inputs have values",
            },
            {
              actions: "Save Library in local state",
              target: ".Library inputs are empty",
            },
          ],
        },
      },
      "Reference Modal Open": {},
      "Function Modal Open": {},
    },
  },
  {
    actions: {
      setEpicorLibraryDetail: assign((ctx, event: any) => ({
        library: {
          ...ctx.library,
          libraryId: event.libraryId,
          library: {
            ...ctx.library.library,
            description: event.description,
            epicorVersion: event.epicorVersion,
            published: event.published,
            private: event.private,
            mode: event.mode,
            allowCustomCodeWidgets: event.allowCustomCodeWidgets,
            allowCustomCodeFunctions: event.allowCustomCodeFunctions,
            directDBAccess: event.directDBAccess,
            notes: event.notes,
            ownedByCompany: event.ownedByCompany,
            owner: event.owner,
          },
        },
      })),
      addLibraryReference: (ctx, event: any) => {
        const addNewLibraryReference = produce(ctx.library.library.libraryReferences, (draft) => {
          draft?.push(...event.libraryReference);
        });

        assign({
          library: {
            ...ctx.library,
            library: {
              ...ctx.library.library,
              libraryReferences: addNewLibraryReference,
            },
          },
        });
      },
    },
  }
);
