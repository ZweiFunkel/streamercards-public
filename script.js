const issues = [
    {
        title: "Profilseite nach Login",
        number: 29,
        url: "https://github.com/twodarkk/streamercards/issues/29",
        status: "Geplant",
        priority: "Wichtig",
        start_date: "2025-02-26",
        author: { login: "twodarkk", avatar_url: "https://avatars.githubusercontent.com/u/29480360?v=4" },
        created_at: "2025-02-26T15:36:35Z",
        updated_at: "2025-02-26T15:41:10Z"
    },
    {
        title: "Neues Navigationsmenü",
        number: 31,
        url: "https://github.com/twodarkk/streamercards/issues/31",
        status: "Konzeptionierung",
        priority: "Mittel",
        start_date: "2025-02-28",
        author: { login: "twodarkk", avatar_url: "https://avatars.githubusercontent.com/u/29480360?v=4" },
        created_at: "2025-02-27T10:00:00Z",
        updated_at: "2025-02-28T12:00:00Z"
    }
];

function loadIssues() {
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.className = "kanban-card";
        card.innerHTML = `<small>#${issue.number}</small> <strong>${issue.title}</strong>`;
        card.onclick = () => showIssueDetails(issue);
        document.getElementById(issue.status).appendChild(card);
    });
}

function showIssueDetails(issue) {
    document.getElementById("issueTitle").textContent = issue.title;
    document.getElementById("issueLink").href = issue.url;
    document.getElementById("issueDetailsOverlay").style.display = "flex";
}

function closeIssueDetails() {
    document.getElementById("issueDetailsOverlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", loadIssues);
