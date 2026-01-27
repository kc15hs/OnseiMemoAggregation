// app.js
import {
    onFileInputChange,
    onClearButtonClick,
    onExportButtonClick,
    onSearchButtonClick,
    onAllOffButtonClick,
    onFilterChange,
    onSaveMemoClick
} from './eventHandlers.js';

function bindEvents() {
    document.getElementById('fileInput').addEventListener('change', onFileInputChange);
    document.getElementById('clearButton').addEventListener('click', onClearButtonClick);
    document.getElementById('exportButton').addEventListener('click', onExportButtonClick);
    document.getElementById('searchButton').addEventListener('click', onSearchButtonClick);
    document.getElementById('allOffButton').addEventListener('click', onAllOffButtonClick);
    document.querySelectorAll('input[name="displayFilter"]').forEach(r =>
        r.addEventListener('change', onFilterChange)
    );
    document.getElementById('saveMemoButton').addEventListener('click', onSaveMemoClick);
}

document.addEventListener('DOMContentLoaded', bindEvents);
