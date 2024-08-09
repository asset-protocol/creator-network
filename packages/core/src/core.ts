export type PluginFunc = (cn: CreatorNetwork) => void | (() => void);

export class CreatorNetwork {
  protected _container: { [key: string]: any };

  constructor() {
    this._container = {}
  }

  set<T = any>(key: string, v: T): this {
    this._container[key] = v;
    return this;
  }

  get<T = any>(key: string): (T | undefined) {
    return this._container[key] as T | undefined;
  }

  use(...plugins: PluginFunc[]): void | (() => void) {
    const disposes: (void | (() => void))[] = []
    for (const func of plugins) {
      disposes.push(func(this));
    }
    return () => {
      for (const dispose of disposes) {
        dispose?.();
      }
    }
  }
}

export const creatorNetwork = new CreatorNetwork();
