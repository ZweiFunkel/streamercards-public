const token = "DEIN_GITHUB_READONLY_TOKEN"; // Hier dein GitHub Token einfügen
const projectId = "PVT_kwHOAcHVqM4AzEVA"; // Project ID deines GitHub Boards

async function fetchIssues() {
    const query = {
        query: `{
            node(id: "${projectId}") {
                ... on ProjectV2 {
                    items(first: 100) {
                        nodes {
                            content {
                                ... on Issue {
                                    title
                                    number
                                    url
                                    labels(first: 10) {
                                        nodes {
                                            name
                                        }
                                    }
                                    projectItems(first: 1) {
                                        nodes {
                                            fieldValues(first: 10) {
                                                nodes {
                                                    ... on ProjectV2ItemFieldSingleSelectValue {
                                                        name
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`
    };

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    });

    const data = await response.json();
    displayIssues(data.data.node.items.nodes);
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

    Object.values(columns).forEach(column => column.innerHTML = "");

    issues.forEach(issue => {
        const issueDiv = document.createElement("div");
        issueDiv.className = "issue";
        issueDiv.innerHTML = `<strong>#${issue.content.number}</strong>: ${issue.content.title}`;
        issueDiv.onclick = () => window.open(issue.content.url, "_blank");

        const status = issue.content.projectItems.nodes[0]?.fieldValues.nodes[0]?.name;
        if (columns[status]) {
            columns[status].appendChild(issueDiv);
        }
    });
}

fetchIssues();
