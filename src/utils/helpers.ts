import numeral from 'numeral';
import moment from 'moment';

const tokenMutez = 1000000;
const tokenFormat = '0,0.[0000]';

export const formatPercent = (value: string | number | bigint): string => {
    return `${numeral(Number(value) * 100).format('0.0')}%`;
};

export const capitalizeLetters = (text: string): string => {
    if (!text) return '';
    return text.replace(text[0], text[0].toLocaleUpperCase());
};

export const convertIntToMutez = (amount: number): number => {
    return amount * tokenMutez;
};

export const convertMutezToInt = (amount: number): number => {
    return amount / tokenMutez;
};

export const ellipsis = (string: string, start = 12, end = -7): string => {
    if (!string) return '';
    return `${string.substr(0, start)}...${string.substr(end)}`;
};

export const formatToken = (value: number, symbol = ''): string => {
    if (!value) return '0';

    const amount = Math.round(value);
    return `${numeral(convertMutezToInt(amount)).format('0,0')} ${symbol}`;
};

export const formatMinimalDenomToCoinDenom = (
    val: number | string,
    coinDenom = '',
): string => {
    const value = Number(val);

    if (!value || 1 > value) return `0 ${coinDenom}`;
    else if (value > 1000 * tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            '0,[]',
        )} ${coinDenom}`;
    } else if (value > 100 * tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            '0,0.[00]',
        )} ${coinDenom}`;
    } else if (value > 10 * tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            tokenFormat,
        )} ${coinDenom}`;
    } else if (value < tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            '0,0.[000000000]',
        )} ${coinDenom}`;
    }

    return `${convertMutezToInt(value)} ${coinDenom}`;
};

export const formatDate = (date: string) => {
    if (!date) return '---';

    return moment(date).format('lll');
};
