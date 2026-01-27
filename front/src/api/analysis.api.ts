import { axiosInstance as axios } from '@/lib/axios';

type ApiEnvelope<T> = {
    success: boolean;
    statusCode: number;
    data: T;
};

export type AnalysisProfile = {
    gender: 'male' | 'female' | 'secret';
    birthDate: string;
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
    birthPlace?: string;
    birthCity?: string;
};

export type AnalysisResultRequest = {
    profile: AnalysisProfile;
    answers: Record<string, string>;
    version?: string;
    locale?: 'en' | 'ko';
};

export type AnalysisResultCopy = {
    summaryCard: {
        mainDesire: string;
        subDesire: string;
        userQuote: string;
        engineLine: string;
        styleLine: string;
        tags: string[];
    };
    structure: { lines: string[] };
    trigger: { lines: string[] };
    illusion: { lines: string[] };
    intimacy: { lines: string[] };
    paywallCTA: string;
};

export type AnalysisTendencyItem = {
    key: string;
    direction?: string;
    visibility: 'free' | 'paid';
    confidence: 'high' | 'medium';
    label: string;
    rationale?: string;
    detail?: string;
    tags?: string[];
};

export type AnalysisTendency = {
    primary: string;
    secondary: string;
    source: 'pair' | 'primary';
    items: AnalysisTendencyItem[];
};

export type AnalysisResultResponse = {
    copy: AnalysisResultCopy;
    tendency: AnalysisTendency;
};

export type AnalysisShareRequest = {
    profile: AnalysisProfile;
    answers: Record<string, string>;
    version?: string;
    locale?: 'en' | 'ko';
    copy: AnalysisResultCopy;
};

export type AnalysisShareResponse = {
    shareId: string;
    shareUrl: string;
    expiresAt: string | null;
};

export type AnalysisShareResultResponse = {
    shareId: string;
    expiresAt: string | null;
    version: string;
    locale: 'en' | 'ko';
    copy: AnalysisResultCopy;
    tendency?: AnalysisTendency | null;
};

export async function postAnalysisResult(
    payload: AnalysisResultRequest,
): Promise<AnalysisResultResponse> {
    const { data } = await axios.post<ApiEnvelope<AnalysisResultResponse>>(
        '/analysis/result',
        payload,
    );

    if (!data?.success) {
        throw new Error(`Failed to load analysis result (status: ${data?.statusCode ?? 'unknown'})`);
    }

    return data.data;
}

export async function postShareResult(
    payload: AnalysisShareRequest,
): Promise<AnalysisShareResponse> {
    const { data } = await axios.post<ApiEnvelope<AnalysisShareResponse>>(
        '/analysis/share',
        payload,
    );

    if (!data?.success) {
        throw new Error(`Failed to create share link (status: ${data?.statusCode ?? 'unknown'})`);
    }

    return data.data;
}

export async function getShareResult(shareId: string): Promise<AnalysisShareResultResponse> {
    const { data } = await axios.get<ApiEnvelope<AnalysisShareResultResponse>>(
        `/analysis/share/${encodeURIComponent(shareId)}`,
    );

    if (!data?.success) {
        throw new Error(`Failed to load share result (status: ${data?.statusCode ?? 'unknown'})`);
    }

    return data.data;
}
