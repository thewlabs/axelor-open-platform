import { DataStore } from "@/services/client/data-store";
import { View } from "@/services/client/meta.types";
import { atom } from "jotai";
import { createScope, molecule, useMolecule } from "jotai-molecules";
import { DataContext } from "@/services/client/data.types";

export type DashletHandler = {
  dataStore?: DataStore;
  view?: View;
  onAction?: (action: string, context?: DataContext) => Promise<any>;
  onLegendShowHide?: (show: boolean) => void;
  onExport?: () => Promise<void>;
  onRefresh?: () => Promise<void | any>;
};

export const DashletScope = createScope<DashletHandler>({});

const dashletMolecule = molecule((getMol, getScope) => {
  return atom(getScope(DashletScope));
});

export function useDashletHandlerAtom() {
  return useMolecule(dashletMolecule);
}
