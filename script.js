async function fetchIssues() {
    try {
        const response = await fetch("issues.json");
        const issues = await response.json();
        displayIssues(issues);
    } catch (error) {
        console.error("Fehler beim Abrufen der Issues:", error);
    }
}

function displayIssues(issues) {
    const columns = {
        "Geplant": document.getElementById("geplant"),
        "Konzeptionierung": document.getElementById("konzeptionierung"),
        "In Bearbeitung": document.getElementById("in-bearbeitung"),
        "Im Test": document.getElementById("im-test"),
        "Beta-/Testphase": document.getElementById("beta-testphase"),
        "Abgeschlossen": document.getElementById("abgeschlossen"),
        "Ungültig": document.getElementById("ungueltig")
    };

    Object.values(columns).forEach(column => column.innerHTML = "<h2>" + column.id.replace("-", " ") + "</h2>");

    issues.forEach(issue => {
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.innerHTML = `
            <div class="issue-header">
                <a href="${issue.url}" target="_blank">#${issue.number}: ${issue.title}</a>
            </div>
            <div class="issue-info">
                <span class="status">${issue.status}</span>
                <span class="priority">${issue.priority}</span>
                <span class="date">${issue.start_date}</span>
            </div>
        `;
        issueDiv.onclick = () => window.open(issue.url, "_blank");

        if (columns[issue.status]) {
            columns[issue.status].appendChild(issueDiv);
        }
    });
}

fetchIssues();
