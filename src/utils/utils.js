export const parseIdFromUrl = (url = '') => {
    const reg = /\/(\d+?)\/?$/g;
    const result = reg.exec(url);
    return result && result.length > 0 ? parseInt(result[1], 10) : null;
}