function startSearch() {
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
        output.textContent = "❌ Pattern not found.";
    }
}

function boyerMoore(text, pattern) {
    // Boyer-Moore algorithm implementation
}

function visualizeMatch(text, pattern, index) {
    // Visualization implementation
}

function nextStep() {
    // Next step implementation
}

function resetSearch() {
    // Reset search implementation
}