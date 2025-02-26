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
        "Geplant": document.querySelector("#geplant .task-list"),
        "Konzeptionierung": document.querySelector("#konzeptionierung .task-list"),
        "In Bearbeitung": document.querySelector("#in-bearbeitung .task-list"),
        "Im Test": document.querySelector("#im-test .task-list"),
        "Beta-/Testphase": document.querySelector("#beta-testphase .task-list"),
        "Abgeschlossen": document.querySelector("#abgeschlossen .task-list"),
        "Ungültig": document.querySelector("#ungueltig .task-list")
    };

    Object.values(columns).forEach(column => column.innerHTML = "");

    issues.forEach(issue => {
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.draggable = true;
        issueDiv.ondragstart = (event) => event.dataTransfer.setData("text", issue.number);
        issueDiv.innerHTML = `
            <div class="issue-header">
                <a href="${issue.url}" target="_blank">#${issue.number} ${issue.title}</a>
            </div>
            <div class="issue-info">
                <span class="status ${issue.status.toLowerCase()}">${issue.status}</span>
                <span class="priority">${issue.priority}</span>
                <span class="date">${issue.start_date}</span>
            </div>
        `;
        if (columns[issue.status]) {
            columns[issue.status].appendChild(issueDiv);
        }
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const issueNumber = event.dataTransfer.getData("text");
    console.log(`Issue ${issueNumber} wurde verschoben.`);
}

fetchIssues();
