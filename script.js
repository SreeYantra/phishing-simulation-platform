document.getElementById('analyzeButton').addEventListener('click', async () => {
    const emailContent = document.getElementById('emailInput').value;
    if (emailContent.trim() === '') {
        alert('Please paste an email to analyze.');
        return;
    }

    // Send the email content to an external phishing detection service (API)
    const result = await analyzeEmailForPhishing(emailContent);

    // Display the result to the user
    document.getElementById('analysisResult').innerHTML = `
        <h3>Analysis Result:</h3>
        <p><strong>Phishing Risk:</strong> ${result.isPhishing ? 'High' : 'Low'}</p>
        <p><strong>Reason:</strong> ${result.reason}</p>
    `;
});

// External phishing detection API integration
async function analyzeEmailForPhishing(emailContent) {
    const apiEndpoint = 'https://api.phisherscore.com/analyze';  // Example API endpoint
    const apiKey = 'your-api-key';  // Replace with actual API key

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email: emailContent })
    });

    const data = await response.json();
    return data;
}
