export const roundValue = (value) => {
    if (value >= 1000) {
        const roundedValue = Math.round((value / 1000) * 10) / 10;
        return `${roundedValue}k`;
    }
    return value;
};