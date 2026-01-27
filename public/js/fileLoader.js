// fileLoader.js
import { createGoogleMapsUrl, isValidLatLng, toYYMMDD } from './utils.js';

export async function loadTextFiles(files) {
    const memos = [];
    for (const file of files) {
        const text = await file.text();
        text.split(/\r?\n/).forEach(line => {
            const m = parseLineToMemo(line);
            if (m) memos.push(m);
        });
    }
    return memos;
}

function parseLineToMemo(line) {
    const trimmed = String(line).trim();
    if (!trimmed) return null;

    // Example:
    // 2026-01-17 03:38:13 - 外の気温はマイナス2.7度 (lat: 36.56..., lng: 138.73...)
    const match = trimmed.match(/^(.+?)\s-\s(.+?)\s\(lat:\s*([^,]+),\s*lng:\s*([^)]+)\)\s*$/);
    if (!match) return null;

    const [, dt, memo, latRaw, lngRaw] = match;
    const lat = String(latRaw).trim();
    const lng = String(lngRaw).trim();

    const mapUrl = isValidLatLng(lat, lng) ? createGoogleMapsUrl(lat, lng) : null;

    return {
        id: dt + memo,
        datetime: dt,
        memo,
        lat,
        lng,
        mapUrl
    };
}

export function exportMemosToFile(memos) {
    if (!memos || memos.length === 0) return;

    // 出力対象の最古（先頭）の yymmdd を使用（呼び出し側で表示順のまま渡される想定）
    const yymmdd = toYYMMDD(memos[0].datetime);
    const filename = `集約メモ_${yymmdd}.txt`;

    const lines = memos.map(m =>
        `${m.datetime} - ${m.memo} (lat: ${m.lat}, lng: ${m.lng})`
    );

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}
