import { useMemo } from "react";
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";

let store: IStore | undefined;

const Store = types.model({});

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;

export function initializeStore(snapshot = null) {
  const _store = store ?? Store.create();

  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // SSG, SSR
  if (typeof window === "undefined") return _store;
  // CSR
  if (!store) store = _store;

  return store;
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
