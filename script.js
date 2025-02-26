document.addEventListener("DOMContentLoaded", async function() {
    const columnsData = [
        { title: "Geplant", status: "Geplant", color: "blue" },
        { title: "Konzeptionierung", status: "Konzeptionierung", color: "yellow" },
        { title: "In Bearbeitung", status: "In Bearbeitung", color: "orange" },
        { title: "Im Test", status: "Im Test", color: "purple" },
        { title: "Beta-Testphase", status: "Beta Testphase", color: "gold" },
        { title: "Abgeschlossen", status: "Abgeschlossen", color: "green" },
        { title: "Ungültig", status: "Ungültig", color: "red" }
    ];

    const response = await fetch("issues.json");
    const issues = await response.json();

    const board = document.getElementById("columns");

    columnsData.forEach(columnData => {
        const column = document.createElement("div");
        column.classList.add("column");

        const columnTitle = document.createElement("h2");
        columnTitle.textContent = columnData.title;
        column.appendChild(columnTitle);

        const columnSubtext = document.createElement("p");
        columnSubtext.textContent = `Befindet sich in der ${columnData.title.toLowerCase()}.`;
        column.appendChild(columnSubtext);

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

function showIssueDetails(issue) {
    document.getElementById("issue-title").textContent = `${issue.title} #${issue.number}`;
    document.getElementById("issue-status").textContent = issue.status;
    document.getElementById("issue-status").classList.add(`status-${issue.status.toLowerCase().replace(/ /g, "-")}`);
    document.getElementById("issue-author-avatar").src = issue.author.avatar_url;
    document.getElementById("issue-author").textContent = issue.author.login;
    document.getElementById("issue-created").textContent = new Date(issue.created_at).toLocaleDateString();
    document.getElementById("issue-updated").textContent = new Date(issue.updated_at).toLocaleDateString();
    document.getElementById("issue-milestone").textContent = issue.milestone?.title || "Kein Meilenstein";
    document.getElementById("issue-labels").textContent = issue.labels.map(label => label.name).join(", ") || "Keine Labels";
    document.getElementById("issue-priority").textContent = issue.priority || "Keine Priorität";
    document.getElementById("issue-start-date").textContent = issue.start_date || "Kein Datum";
    document.getElementById("issue-link").href = issue.url;

    document.getElementById("issue-details").classList.remove("hidden");
}

document.getElementById("close-issue").addEventListener("click", () => {
    document.getElementById("issue-details").classList.add("hidden");
});
