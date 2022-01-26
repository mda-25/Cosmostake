import numeral from 'numeral';

export const formatNumber = (value: any) => {
    return numeral(value).format('0,[]');
};

export const formatPercent = (value: string | number | bigint) => {
    return `${numeral(Number(value) * 100).format('0.0')}%`;
};

export const capitalizeLetters = (text: string) => {
    if (!text) return '';
    return text.replace(text[0], text[0].toLocaleUpperCase());
};
