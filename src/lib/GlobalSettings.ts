export interface GlobalSettingsValue {
  [key: string]: string | number;
}

export class GlobalSettings {
  private readonly dictionary: GlobalSettingsValue;

  constructor(value: GlobalSettingsValue) {
    this.dictionary = value;
  }

  public getValue<T extends string | number | boolean>(key: string): T {
    if (!this.dictionary.hasOwnProperty(key)) {
      throw new Error(`${key}는 관리되는 항목이 아닙니다.`);
    }

    return this.dictionary[key] as T;
  }
}
