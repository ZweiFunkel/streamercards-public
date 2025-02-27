document.addEventListener("DOMContentLoaded", async function() {
  // Die Spalten, die auf dem Board erscheinen sollen
  const columnsData = [
    { title: "Geplant",           status: "Geplant"          },
    { title: "Konzeptionierung",  status: "Konzeptionierung" },
    { title: "In Bearbeitung",    status: "In Bearbeitung"   },
    { title: "Im Test",           status: "Im Test"          },
    { title: "Beta-Testphase",    status: "Beta Testphase"   },
    { title: "Abgeschlossen",     status: "Abgeschlossen"    },
    { title: "Ungültig",          status: "Ungültig"         }
  ];

  // Issues aus einer JSON-Datei laden
  // (z. B. https://dein-server.de/issues.json oder lokal im Repo)
  const response = await fetch("issues.json");
  const issues = await response.json();

  const board = document.getElementById("columns");

  // Erzeuge für jede Spalte ein DIV und fülle es mit passenden Issues
  columnsData.forEach(columnData => {
    const column = document.createElement("div");
    column.classList.add("column");

    const columnTitle = document.createElement("h2");
    columnTitle.textContent = columnData.title;
    column.appendChild(columnTitle);

    // Kleiner Untertitel / Beschreibung (optional)
    const columnSubtext = document.createElement("p");
    columnSubtext.textContent = `Befindet sich in der ${columnData.title.toLowerCase()}.`;
    column.appendChild(columnSubtext);

    // Alle Issues durchgehen und zuordnen, die denselben Status haben
    issues.forEach(issue => {
      if (issue.status === columnData.status) {
        const card = document.createElement("div");
        card.classList.add("issue-card");
        card.innerHTML = `
          <span>#${issue.number}</span>
          <span>${issue.title}</span>
          <img src="${issue.author.avatar_url}" alt="Avatar" width="20" height="20">
        `;
        card.addEventListener("click", () => showIssueDetails(issue));
        column.appendChild(card);
      }
    });

    board.appendChild(column);
  });
});

// Zeigt das Detail-Panel an und befüllt es mit den Daten des geklickten Issues
function showIssueDetails(issue) {
  // Titel + Nummer
  const issueTitleEl = document.getElementById("issue-title");
  issueTitleEl.textContent = `${issue.title} #${issue.number}`;

  // Status + Status-Farbklasse
  const issueStatusEl = document.getElementById("issue-status");
  issueStatusEl.textContent = issue.status;
  // Erstmal alte Status-Klassen entfernen
  issueStatusEl.className = "";
  // Dann die passende Klasse hinzufügen (z.B. status-geplant)
  const statusClass = `status-${issue.status.toLowerCase().replace(/ /g, "-")}`;
  issueStatusEl.classList.add(statusClass);

  // Avatar + Author
  const avatarEl = document.getElementById("issue-author-avatar");
  avatarEl.src = issue.author.avatar_url;
  document.getElementById("issue-author").textContent = issue.author.login;

  // Body
  document.getElementById("issue-body").textContent = issue.body;

  // Daten
  const createdDate = new Date(issue.created_at).toLocaleDateString();
  const updatedDate = new Date(issue.updated_at).toLocaleDateString();
  document.getElementById("issue-created").textContent = createdDate;
  document.getElementById("issue-updated").textContent = updatedDate;
  document.getElementById("issue-milestone").textContent =
    issue.milestone?.title || "Kein Meilenstein";

  // Labels
  const labels = issue.labels.map(label => label.name).join(", ") || "Keine Labels";
  document.getElementById("issue-labels").textContent = labels;

  // Priorität
  document.getElementById("issue-priority").textContent =
    issue.priority || "Keine Priorität";

  // Start-Datum
  document.getElementById("issue-start-date").textContent =
    issue.start_date || "Kein Datum";

  // Link
  const linkEl = document.getElementById("issue-link");
  linkEl.href = issue.url;

  // Detail-Panel einblenden
  document.getElementById("issue-details").classList.remove("hidden");
}

// Schließen des Detail-Panels
document.getElementById("close-issue").addEventListener("click", () => {
  document.getElementById("issue-details").classList.add("hidden");
});
