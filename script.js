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
        "Geplant": document.querySelector("#geplant .issues"),
        "Konzeptionierung": document.querySelector("#konzeptionierung .issues"),
        "In Bearbeitung": document.querySelector("#in-bearbeitung .issues"),
        "Im Test": document.querySelector("#im-test .issues"),
        "Beta-/Testphase": document.querySelector("#beta-testphase .issues"),
        "Abgeschlossen": document.querySelector("#abgeschlossen .issues"),
        "Ungültig": document.querySelector("#ungueltig .issues")
    };

    Object.values(columns).forEach(column => column.innerHTML = "");

    issues.forEach(issue => {
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.innerHTML = `
            <strong>#${issue.number}</strong>: ${issue.title}
            <br><span style="color: ${getPriorityColor(issue.priority)}">${issue.priority}</span>
        `;
        issueDiv.onclick = () => openModal(issue);

        const status = issue.status;
        if (columns[status]) {
            columns[status].appendChild(issueDiv);
        }
    });
}

function getPriorityColor(priority) {
    switch (priority) {
        case "Wichtig": return "red";
        case "Mittel": return "orange";
        case "Niedrig": return "green";
        default: return "white";
    }
}

function openModal(issue) {
    document.getElementById("modal-title").innerText = `#${issue.number} - ${issue.title}`;
    document.getElementById("modal-status").innerText = issue.status;
    document.getElementById("modal-priority").innerText = issue.priority || "Keine Priorität";
    document.getElementById("modal-start").innerText = issue.start_date || "Kein Datum";
    document.getElementById("modal-link").href = issue.url;

    document.getElementById("issueModal").style.display = "flex";
}

document.querySelector(".close").onclick = () => {
    document.getElementById("issueModal").style.display = "none";
};

fetchIssues();
