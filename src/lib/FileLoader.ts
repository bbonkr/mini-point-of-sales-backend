import path from 'path';
import glob, { IOptions } from 'glob';
import { globalSettings } from '../index';

export interface FileLoaderOptions {
  pattern: string;
  globOptions?: IOptions;
}

export class FileLoader {
  private options: FileLoaderOptions;

  constructor(options: FileLoaderOptions) {
    this.options = options;
  }

  public async load<T>(): Promise<T[]> {
    const workingDir = globalSettings.getValue<string>('appRoot');

    const files = glob.sync(
      path.join(workingDir, this.options.pattern),
      this.options.globOptions
    );

    const modules = await Promise.all(
      files.map(f =>
        import(f).then(m => {
          return m;
        })
      )
    );

    const loadedTypes: T[] = modules
      .map(m => {
        for (const name in m) {
          if (m.hasOwnProperty(name)) {
            return new m[name]() as T;
          }
        }

        return undefined;
      })
      .filter((x): x is T => x !== undefined);

    return loadedTypes;
  }
}
