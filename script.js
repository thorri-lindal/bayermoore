let text = "";
let pattern = "";
let currentIndex = 0;
let badCharTable = {};
let stepCount = 0;

function startSearch() {
    text = document.getElementById("text").value;
    pattern = document.getElementById("pattern").value;
    document.getElementById("output").innerHTML = "";
    currentIndex = 0;
    stepCount = 0;
    generateBadCharacterTable();
    updateVisualization();
}

function generateBadCharacterTable() {
    badCharTable = {};
    let patternLength = pattern.length;
    for (let i = 0; i < patternLength; i++) {
        badCharTable[pattern[i]] = i; 
    }

    let tableBody = document.querySelector("#bad-char-table tbody");
    tableBody.innerHTML = "";
    for (let char in badCharTable) {
        let row = `<tr><td>${char}</td><td>${badCharTable[char]}</td></tr>`;
        tableBody.innerHTML += row;
    }
}

function updateVisualization() {
    let visualText = "";
    for (let i = 0; i < text.length; i++) {
        if (i >= currentIndex && i < currentIndex + pattern.length) {
            visualText += `<span class="highlight">${text[i]}</span>`;
        } else {
            visualText += text[i];
        }
    }
    document.getElementById("visualization").innerHTML = visualText;
}

function nextStep() {
    if (currentIndex > text.length - pattern.length) {
        document.getElementById("output").innerHTML = "❌ Pattern not found.";
        return;
    }

    let match = true;
    let mismatchIndex = -1;

    for (let j = pattern.length - 1; j >= 0; j--) {
        if (text[currentIndex + j] !== pattern[j]) {
            match = false;
            mismatchIndex = j;
            break;
        }
    }

    let tableBody = document.querySelector("#comparison-table tbody");
    let shiftValue = match ? 0 : Math.max(1, mismatchIndex - (badCharTable[text[currentIndex + mismatchIndex]] || -1));

    let row = `<tr>
        <td>${++stepCount}</td>
        <td>${currentIndex}</td>
        <td class="${match ? 'matched' : 'mismatched'}">${match ? '✅' : '❌'}</td>
        <td>${match ? 'Pattern Found!' : shiftValue}</td>
    </tr>`;
    tableBody.innerHTML += row;

    if (match) {
        document.getElementById("output").innerHTML = `✅ Pattern found at index <b>${currentIndex}</b>`;
        return;
    }

    currentIndex += shiftValue;
    updateVisualization();
}

function resetSearch() {
    currentIndex = 0;
    stepCount = 0;
    document.getElementById("output").innerHTML = "";
    document.querySelector("#comparison-table tbody").innerHTML = "";
    updateVisualization();
}
