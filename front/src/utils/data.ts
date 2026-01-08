export const safeJsonParse = <T>(jsonString: string, defaultValue: T): T => {
    if (!jsonString) {
        return defaultValue;
    }

    try {
        return JSON.parse(jsonString) as T;
    } catch (error) {
        return defaultValue;
    }
};
