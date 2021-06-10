export function mergeDataWithKey(data) {
    if (!data) {
        return [];
    }
    return Object.values(data).map((value, index) => {
        return {
            ...value,
            key: Object.keys(data)[index],
        };
    });
}

export function byPropKey(propertyName, value) {
    return {
        [propertyName]: value,
    };
}

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
