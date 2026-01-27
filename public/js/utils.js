// utils.js
export function createGoogleMapsUrl(lat, lng) {
    return `https://www.google.com/maps?q=${lat},${lng}`;
}

export function toYYMMDD(dateStr) {
    // dateStr: "yyyy-mm-dd hh:mm:ss"
    // returns: "yymmdd"
    const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})\s/);
    if (!m) return "000000";
    const yy = m[1].slice(2);
    return `${yy}${m[2]}${m[3]}`;
}

export function isValidLatLng(lat, lng) {
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) return false;
    if (latNum < -90 || latNum > 90) return false;
    if (lngNum < -180 || lngNum > 180) return false;
    return true;
}
