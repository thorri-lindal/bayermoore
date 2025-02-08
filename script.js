function search() {
    let text = document.getElementById("text").value;
    let pattern = document.getElementById("pattern").value;
    let output = document.getElementById("output");
    let visualization = document.getElementById("visualization");

    if (!text || !pattern) {
        output.textContent = "⚠️ Please enter both text and pattern.";
        return;
    }

    let index = boyerMoore(text, pattern);
    if (index !== -1) {
        output.innerHTML = `✅ Pattern found at index <b>${index}</b>`;
        visualizeMatch(text, pattern, index);
    } else {
        output.innerHTML = "❌ Pattern not found.";
        visualization.innerHTML = "";
    }
}

function visualizeMatch(text, pattern, index) {
    let highlightedText = text.substring(0, index) +
        `<span class="highlight">${text.substring(index, index + pattern.length)}</span>` +
        text.substring(index + pattern.length);

    document.getElementById("visualization").innerHTML = `Result: ${highlightedText}`;
}

function boyerMoore(text, pattern) {
    let m = pattern.length;
    let n = text.length;
    let badChar = badCharacterTable(pattern);

    let s = 0;
    while (s <= (n - m)) {
        let j = m - 1;
        while (j >= 0 && pattern[j] === text[s + j])
            j--;

        if (j < 0) {
            return s;
        } else {
            let shift = Math.max(1, j - (badChar[text[s + j]] || -1));
            s += shift;
        }
    }
    return -1;
}

function badCharacterTable(pattern) {
    let badChar = {};
    let m = pattern.length;
    for (let i = 0; i < m; i++) {
        badChar[pattern[i]] = i;
    }
    return badChar;
}
