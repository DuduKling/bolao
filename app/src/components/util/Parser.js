const json = (item) => {
    try {
        return JSON.parse(item);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
};

export default {
    json,
};
