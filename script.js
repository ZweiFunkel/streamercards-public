// Status-Farben für das Kanban-Board & Issue-Seite
const statusColors = {
    "Geplant": "#2185d0",
    "Konzeptionierung": "#f2711c",
    "In Bearbeitung": "#db2828",
    "Im Test": "#6435c9",
    "Beta-/Testphase": "#fbbd08",
    "Abgeschlossen": "#21ba45",
    "Ungültig": "#a5673f",
    "Fehlerhaft": "#d01919"
};

// Issue-Daten aus issues.json laden
async function loadIssues() {
    try {
        const response = await fetch("issues.json");
        const issues = await response.json();
        renderKanbanBoard(issues);
    } catch (error) {
        console.error("Fehler beim Laden der Issues:", error);
    }
}

// Kanban-Board befüllen
function renderKanbanBoard(issues) {
    const columns = {
        "Geplant": document.getElementById("column-planned"),
        "Konzeptionierung": document.getElementById("column-concept"),
        "In Bearbeitung": document.getElementById("column-progress"),
        "Im Test": document.getElementById("column-test"),
        "Beta-/Testphase": document.getElementById("column-beta"),
        "Abgeschlossen": document.getElementById("column-done"),
        "Ungültig": document.getElementById("column-invalid"),
        "Fehlerhaft": document.getElementById("column-error")
    };

    // Board leeren
    Object.values(columns).forEach(column => column.innerHTML = "");

    // Issues hinzufügen
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.classList.add("kanban-card");
        card.style.borderLeft = `4px solid ${statusColors[issue.status] || "#ccc"}`;
        card.innerHTML = `
            <div class="card-header">
                <span class="issue-number">#${issue.number}</span>
                <img class="assignee-avatar" src="${issue.author.avatar_url}" alt="${issue.author.login}">
            </div>
            <div class="card-title">${issue.title}</div>
            <div class="card-footer">${issue.priority ? `<span class="priority">${issue.priority}</span>` : ""}</div>
        `;

        // Click-Event für Detailansicht
        card.addEventListener("click", () => openIssueDetails(issue));

        // In richtige Spalte packen
        if (columns[issue.status]) {
            columns[issue.status].appendChild(card);
        }
    });
}

// Issue-Detailansicht öffnen
function openIssueDetails(issue) {
    const modal = document.getElementById("issue-modal");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <div class="modal-header" style="border-left: 5px solid ${statusColors[issue.status] || "#ccc"};">
            <span class="issue-title">${issue.title} <span class="issue-number">#${issue.number}</span></span>
            <button class="close-btn" onclick="closeIssueDetails()">×</button>
        </div>
        <div class="modal-body">
            <p><strong>Status:</strong> <span class="status-badge" style="background:${statusColors[issue.status] || "#ccc"}">${issue.status}</span></p>
            <p><strong>Autor:</strong> <img class="author-avatar" src="${issue.author.avatar_url}" alt="${issue.author.login}"> ${issue.author.login}</p>
            <p><strong>Erstellt:</strong> ${new Date(issue.created_at).toLocaleDateString()}</p>
            <p><strong>Letzte Aktualisierung:</strong> ${new Date(issue.updated_at).toLocaleDateString()}</p>
            ${issue.milestone ? `<p><strong>Meilenstein:</strong> ${issue.milestone.title} (bis ${new Date(issue.milestone.due_on).toLocaleDateString()})</p>` : ""}
            ${issue.labels.length ? `<p><strong>Labels:</strong> ${issue.labels.map(label => `<span class="label" style="background:#${label.color}">${label.name}</span>`).join(" ")}</p>` : ""}
            <p><strong>Priorität:</strong> ${issue.priority || "Keine"}</p>
            <p><strong>Start-Datum:</strong> ${issue.start_date || "Nicht gesetzt"}</p>
        </div>
        <div class="modal-footer">
            <a href="${issue.url}" target="_blank">Auf GitHub ansehen</a>
        </div>
    `;

    modal.style.display = "block";
}

// Issue-Detailansicht schließen
function closeIssueDetails() {
    document.getElementById("issue-modal").style.display = "none";
}

// Kanban-Board nach Laden der Seite befüllen
document.addEventListener("DOMContentLoaded", loadIssues);
