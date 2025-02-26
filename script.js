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
        issueDiv.innerHTML = `<strong>#${issue.number}</strong>: ${issue.title}`;
        issueDiv.onclick = () => window.open(issue.url, "_blank");

        // Hier müsstest du den Status der Issues noch mit einer separaten API-Abfrage bekommen
        const status = "Geplant"; // Standardmäßig auf "Geplant" setzen
        if (columns[status]) {
            columns[status].appendChild(issueDiv);
        }
    });
}

fetchIssues();
