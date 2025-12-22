/**
 * 랜덤 정수 반환
 * @param min 최소 값
 * @param max 최대 값
 * @returns 랜덤 정수
 */
export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 랜덤 실수 반환
 * @param min 최소 값
 * @param max 최대 값
 * @param digits 소수점 이하 자릿수
 * @returns 랜덤 실수
 */
export const getRandomFloat = (min: number, max: number, digits: number): number => {
    const factor = Math.pow(10, digits);
    return Math.floor(Math.random() * (max - min + 1) + min * factor) / factor;
};
