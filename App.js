async function checkInteraction() {
    const herb = document.getElementById('herbInput').value.toLowerCase();
    const drug = document.getElementById('drugInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('interactions.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header

        let match = rows.find(row => {
            const [h, d] = row.toLowerCase().split(',');
            return h.includes(herb) && d.includes(drug);
        });

        resultDiv.classList.remove('hidden');
        if (match) {
            const [h, d, severity, desc] = match.split(',');
            document.getElementById('statusTitle').innerText = "Interaction Found!";
            document.getElementById('description').innerText = desc;
            const tag = document.getElementById('severityTag');
            tag.innerText = severity;
            tag.className = `tag ${severity.toLowerCase()}`;
        } else {
            document.getElementById('statusTitle').innerText = "No Known Interaction";
            document.getElementById('description').innerText = "No significant interaction found in current database. Always consult a doctor.";
            document.getElementById('severityTag').className = "hidden";
        }
    } catch (err) {
        alert("Error loading interactions.csv. Make sure the file exists in the same folder.");
    }
}
