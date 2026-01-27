import { axiosInstance as axios } from '@/lib/axios';

export type QuestionChoice = { id: string; label: string; sub?: string };
export type QuestionItem = {
    id: string;
    title: string;
    subtitle?: string;
    choices: QuestionChoice[];
};

export type QuestionSetResponse = {
    version: string;
    locale: 'en' | 'ko';
    questions: QuestionItem[];
};

type ApiEnvelope<T> = {
    success: boolean;
    statusCode: number;
    data: T;
};

export async function getQuestionSet(params: {
    locale: 'en' | 'ko';
    version?: string;
}): Promise<QuestionSetResponse> {
    const { locale, version = 'v1' } = params;
    const { data } = await axios.get<ApiEnvelope<QuestionSetResponse>>('/question', {
        params: { v: version, locale },
    });

    if (!data?.success) {
        throw new Error(`Failed to load question set (status: ${data?.statusCode ?? 'unknown'})`);
    }

    return data.data;
}
