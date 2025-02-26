async function fetchIssues() {
    try {
        const response = await fetch("issues.json"); // Holt die Issues aus GitHub Actions
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

    // Spalten zurücksetzen, bevor neue Einträge geladen werden
    Object.values(columns).forEach(column => column.innerHTML = "<h2>" + column.id.replace("-", " ") + "</h2>");

    issues.forEach(issue => {
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.innerHTML = `<strong>#${issue.content.number}</strong>: ${issue.content.title}`;
        issueDiv.onclick = () => window.open(issue.content.url, "_blank");

        const status = issue.content.projectItems.nodes[0]?.fieldValues.nodes[0]?.name || "Geplant"; // Standard "Geplant"
        if (columns[status]) {
            columns[status].appendChild(issueDiv);
        }
    });
}

fetchIssues();
