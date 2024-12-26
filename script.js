function checkTrivia(answer) {
    if(answer === 'Vettamrugam') {
        document.querySelector('#formSection').style.display = 'block';
        document.querySelector('.trivia-section').innerHTML = '<h3 style="color: #ff3333;">Correct!</h3><p>You can now generate your membership certificate.</p>';
    } else {
        alert('Incorrect answer. Try again!');
    }
}

function generateCertificate() {
    const name = document.getElementById('memberName').value;
    if (!name) {
        alert('Please enter your name');
        return;
    }

    const today = new Date();
    const validUntil = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());
    const validityDate = validUntil.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('nameSpan').textContent = name;
    document.getElementById('validityDate').textContent = validityDate;
    document.getElementById('certificateContainer').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'inline-block';
}

async function downloadCertificate() {
    const certificate = document.getElementById('certificate');
    
    try {
        const canvas = await html2canvas(certificate, {
            scale: 2,
            backgroundColor: 'white'
        });

        const link = document.createElement('a');
        link.download = 'RifleClub-Membership.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        console.error('Error generating certificate:', err);
        alert('There was an error generating your certificate. Please try again.');
    }
}