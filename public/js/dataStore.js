// dataStore.js
let memoList = [];

export function addMemos(memos) {
    memos.forEach(m => {
        if (!memoList.some(x => x.datetime === m.datetime && x.memo === m.memo)) {
            memoList.push({...m, checked:false});
        }
    });
    memoList.sort((a,b)=>a.datetime.localeCompare(b.datetime));
}

export function getFilteredMemos(filter) {
    if (filter === 'checked') return memoList.filter(m=>m.checked);
    if (filter === 'unchecked') return memoList.filter(m=>!m.checked);
    return [...memoList];
}

export function setChecked(id, checked) {
    const m = memoList.find(x=>x.id===id);
    if (m) m.checked = checked;
}

export function setCheckedBySearch(keyword) {
    memoList.forEach(m=>{
        if (m.memo.includes(keyword)) m.checked = true;
    });
}

export function clearMemosByRule() {
    const anyChecked = memoList.some(m=>m.checked);
    memoList = anyChecked ? memoList.filter(m=>!m.checked) : [];
}

export function clearAllChecks() {
    memoList.forEach(m=>m.checked=false);
}

export function updateMemoText(id, text) {
    const m = memoList.find(x=>x.id===id);
    if (m) m.memo = text;
}
