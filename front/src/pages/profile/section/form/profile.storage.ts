import { safeJsonParse } from '@/utils/data';
import { birthTimeValues, type BirthTimeValue } from './form.schema';

export const PROFILE_STORAGE_KEY = 'taavah.profile';

export type StoredProfile = {
    gender?: 'male' | 'female' | 'secret';
    birthDate?: string; // YYYY-MM-DD
    birthTime?: BirthTimeValue;
    birthPlace?: string;
};

export function loadStoredProfile(): StoredProfile | undefined {
    try {
        const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (!raw) return undefined;

        const parsed = safeJsonParse(raw, null);
        if (!parsed || typeof parsed !== 'object') return undefined;

        const obj = parsed as Record<string, unknown>;

        const gender =
            obj.gender === 'male' || obj.gender === 'female' || obj.gender === 'secret'
                ? obj.gender
                : undefined;

        const birthDate = typeof obj.birthDate === 'string' ? obj.birthDate : undefined;

        const birthTime =
            typeof obj.birthTime === 'string' &&
            (birthTimeValues as readonly string[]).includes(obj.birthTime)
                ? (obj.birthTime as BirthTimeValue)
                : undefined;

        const birthPlace = typeof obj.birthPlace === 'string' ? obj.birthPlace : undefined;

        return { gender, birthDate, birthTime, birthPlace };
    } catch {
        return undefined;
    }
}

export function saveStoredProfile(profile: StoredProfile) {
    try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
        // ignore (e.g. storage disabled)
    }
}

export function clearStoredProfile() {
    try {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
        // ignore
    }
}
