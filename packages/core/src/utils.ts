export function withDispose(...funcs: (void | (() => void))[]) {
  return () => {
    funcs.forEach(f => f?.());
  }
}