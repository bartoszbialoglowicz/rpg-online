export const useNumber = () => {
    const convertWithSIPrefix = (num: number) => {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(3).replace(/\.000$/, '') + 'g'; // for billions
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(3).replace(/\.000$/, '') + 'b'; // for billions
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(3).replace(/\.000$/, '') + 'm'; // for millions
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(3).replace(/\.000$/, '') + 'k'; // for thousands
        } else {
            return num.toString();
        }
    }

    return {
        convertWithSIPrefix
    }
};

