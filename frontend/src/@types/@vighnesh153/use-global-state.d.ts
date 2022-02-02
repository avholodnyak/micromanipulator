declare module '@vighnesh153/use-global-state' {
  export default function useGlobalState<T>(
    identifier: string,
    initialState?: T | undefined
  ): [T, (v: T) => void];
}
