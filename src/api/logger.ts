class Logger {
  public static instance: Logger | undefined;

  constructor() {
    return this.createSingleton();
  }

  createSingleton(): Logger {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }

  info(message: string) {
    console.log(message);
  }
  error(message: string) {
    console.error(message);
  }
}

const logger = new Logger();

// eslint-disable-next-line no-restricted-exports
export { logger as default };
