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

    // Spalten zurücksetzen
    Object.values(columns).forEach(column => column.innerHTML = "<h2>" + column.id.replace("-", " ") + "</h2>");

    issues.forEach(issue => {
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.innerHTML = `<strong>#${issue.number}</strong>: ${issue.title}`;
        issueDiv.onclick = () => window.open(issue.url, "_blank");

        const status = issue.status || "Geplant"; // Falls kein Status gefunden wird, "Geplant" als Standard setzen
        if (columns[status]) {
            columns[status].appendChild(issueDiv);
        } else {
            console.warn(`Unbekannter Status: ${status}`);
        }
    });
}

fetchIssues();
