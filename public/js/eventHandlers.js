// eventHandlers.js
import * as store from './dataStore.js';
import * as loader from './fileLoader.js';
import * as ui from './uiRenderer.js';

let editingId = null;

export async function onFileInputChange(e) {
    const memos = await loader.loadTextFiles(e.target.files);
    store.addMemos(memos);
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
    e.target.value = '';
}

export function onClearButtonClick() {
    store.clearMemosByRule();
    ui.clearEditor();
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
}

export function onExportButtonClick() {
    const memos = store.getFilteredMemos(ui.getCurrentFilter());
    if (memos.length) loader.exportMemosToFile(memos);
}

export function onSearchButtonClick() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (!keyword) return;
    store.setCheckedBySearch(keyword);
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
}

export function onAllOffButtonClick() {
    store.clearAllChecks();
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
}

export function onFilterChange() {
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
}

export function onMemoCheckChange(id, checked) {
    store.setChecked(id, checked);
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
}

export function onMemoLongPress(id, text) {
    editingId = id;
    ui.updateEditor(text);
}

export function onSaveMemoClick() {
    if (!editingId) return;
    const text = document.getElementById('memoEditor').value.trim();
    if (!text) return;
    store.updateMemoText(editingId, text);
    editingId = null;
    ui.clearEditor();
    ui.renderMemoList(store.getFilteredMemos(ui.getCurrentFilter()));
}
