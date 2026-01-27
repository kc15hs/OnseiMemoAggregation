// uiRenderer.js
import { onMemoCheckChange, onMemoLongPress } from './eventHandlers.js';

const LONG_PRESS_MS = 500;

export function renderMemoList(memos) {
    const list = document.getElementById('memo-list');
    list.innerHTML = '';

    memos.forEach(m => {
        const row = document.createElement('div');
        row.className = 'memo-row';
        row.dataset.id = m.id;

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'memo-check';
        cb.checked = !!m.checked;
        cb.addEventListener('change', () => onMemoCheckChange(m.id, cb.checked));

        // datetime: link only when lat/lng is valid (mapUrl exists)
        let dtEl;
        if (m.mapUrl) {
            const a = document.createElement('a');
            a.className = 'memo-datetime';
            a.href = m.mapUrl;
            a.textContent = m.datetime;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            dtEl = a;
        } else {
            const span = document.createElement('span');
            span.className = 'memo-datetime';
            span.textContent = m.datetime;
            span.classList.add('no-link');
            dtEl = span;
        }

        const text = document.createElement('span');
        text.className = 'memo-text';
        text.textContent = m.memo;

        // Long press (PC: left button hold, Mobile: touch hold)
        let timer = null;

        const startPress = (ev) => {
            // PC left button only
            if (ev.type === 'mousedown' && ev.button !== 0) return;
            cancelPress();
            timer = setTimeout(() => {
                onMemoLongPress(m.id, m.memo);
            }, LONG_PRESS_MS);
        };

        const cancelPress = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };

        text.addEventListener('mousedown', startPress);
        text.addEventListener('mouseup', cancelPress);
        text.addEventListener('mouseleave', cancelPress);

        text.addEventListener('touchstart', startPress, { passive: true });
        text.addEventListener('touchend', cancelPress);
        text.addEventListener('touchmove', cancelPress);

        row.append(cb, dtEl, text);
        list.appendChild(row);
    });
}

export function updateEditor(text) {
    document.getElementById('memoEditor').value = text ?? '';
}

export function clearEditor() {
    document.getElementById('memoEditor').value = '';
}

export function getCurrentFilter() {
    return document.querySelector('input[name="displayFilter"]:checked')?.value || 'all';
}
