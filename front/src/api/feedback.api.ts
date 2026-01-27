export type FeedbackPayload = {
    message: string;
    locale: 'en' | 'ko';
    page: string;
    honeypot?: string;
};

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
        throw new Error('Missing VITE_FORMSPREE_ENDPOINT');
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            message: payload.message,
            locale: payload.locale,
            page: payload.page,
            _gotcha: payload.honeypot,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to submit feedback');
    }
}
