
// *****************************************************************************
// =============================================================================
// Utilities: Math
// =============================================================================
// A collection of math related functions
// *****************************************************************************

// Lerp
// =============================================================================
// Calculates a number between two numbers at a specific increment
// @param  {Number} start  - starting value
// @param  {Number} end    - ending value
// @param  {Number} amount - amount value
// @return {Number}        - resulting value
export function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

// Format bytes
// =============================================================================
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
