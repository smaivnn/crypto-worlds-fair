import { axiosInstance as axios } from '@/lib/axios';

const shouldMock = import.meta.env.VITE_USE_API_MOCK === 'true';
const mockDelayMs = Number(import.meta.env.VITE_API_MOCK_DELAY_MS ?? 400);

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export type MainFormSubmitRequest = {
    name: string;
    gender: 'male' | 'female';
    calendarType: 'solar' | 'lunar';
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    birthDate: string;
    timezone: string;
    birthTime?:
        | 'ja'
        | 'chuk'
        | 'in'
        | 'myo'
        | 'jin'
        | 'sa'
        | 'o'
        | 'mi'
        | 'sin'
        | 'yu'
        | 'sul'
        | 'hae';
    birthLocation?: string;
};

export type MainFormSubmitResponse = {
    requestId: string;
    mocked: boolean;
    received: MainFormSubmitRequest;
    createdAt: string;
};

export async function submitMainForm(
    payload: MainFormSubmitRequest,
): Promise<MainFormSubmitResponse> {
    if (shouldMock) {
        await sleep(mockDelayMs);
        return {
            requestId: crypto.randomUUID(),
            mocked: true,
            received: payload,
            createdAt: new Date().toISOString(),
        };
    }

    try {
        const { data } = await axios.post<MainFormSubmitResponse>('/example/submit', payload);
        return data;
    } catch {
        await sleep(mockDelayMs);
        return {
            requestId: crypto.randomUUID(),
            mocked: true,
            received: payload,
            createdAt: new Date().toISOString(),
        };
    }
}

export type AnalysisExampleResponse = {
    mocked: boolean;
    serverTime: string;
    message: string;
};

export async function getAnalysisExample(): Promise<AnalysisExampleResponse> {
    if (shouldMock) {
        await sleep(mockDelayMs);
        return {
            mocked: true,
            serverTime: new Date().toISOString(),
            message: 'Mock analysis data (no backend connected).',
        };
    }

    try {
        const { data } = await axios.get<AnalysisExampleResponse>('/example/analysis');
        return data;
    } catch {
        await sleep(mockDelayMs);
        return {
            mocked: true,
            serverTime: new Date().toISOString(),
            message: 'Mock analysis data (request failed, fell back to mock).',
        };
    }
}
