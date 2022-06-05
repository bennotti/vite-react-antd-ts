export function defineEnv(name: string, isRequired = true): string | undefined {
    const value = import.meta.env[name];
  
    if (isRequired && value === undefined) {
      console.error(
        `Required environment variable ${name} not defined. Set it on .env's to run the app.`
      );
      return undefined;
    }
  
    return value;
  }
  