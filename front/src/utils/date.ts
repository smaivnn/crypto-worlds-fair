export const generateYears = ({ startYear = 1940 }: { startYear?: number }): number[] => {
    const currentYear = new Date().getFullYear();
    const yearArray: number[] = [];
    for (let y = currentYear; y >= startYear; y--) {
        yearArray.push(y);
    }
    return yearArray;
};

export const generateMonths = (): string[] => {
    return Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
};

export function generateDays({ year, month }: { year: number; month: number }): number[] {
    if (!year || !month) return [];

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let days = daysInMonth[month - 1];

    // 2월 + 윤년 처리
    if (month === 2 && isLeapYear({ year })) {
        days = 29;
    }

    return Array.from({ length: days }, (_, i) => i + 1);
}

export const isLeapYear = ({ year }: { year: number }): boolean => {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    return year % 4 === 0;
};

export const generateBirthDateOptions = ({
    startYear = 1940,
    year,
    month,
}: {
    startYear?: number;
    year?: number;
    month?: number;
}): { years: string[]; months: string[]; days: string[] } => {
    const years = generateYears({ startYear }).map(String);
    const months = generateMonths();

    const days =
        year && month ? generateDays({ year, month }).map((d) => String(d).padStart(2, '0')) : [];

    return { years, months, days };
};
