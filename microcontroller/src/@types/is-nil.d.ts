declare module 'is-nil' {
  export default function isNil(value: any): value is null | undefined;
}
