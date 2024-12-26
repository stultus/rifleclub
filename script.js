function checkTrivia(answer) {
    if(answer === 'Vettamrugam') {
        const formSection = document.querySelector('#formSection');
        formSection.classList.add('show');
        document.querySelector('.trivia-section').innerHTML = '<h3 style="color: #ff3333;">Correct!</h3><p>You can now generate your membership certificate.</p>';
        if(window.innerWidth <= 768) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        alert('Incorrect answer. Try again!');
    }
 }
 
 function generateCertificate() {
    const name = document.getElementById('memberName').value.trim();
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
    
    setTimeout(() => {
        document.getElementById('certificateContainer').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }, 100);
 }
 
 async function downloadCertificate() {
    const certificate = document.getElementById('certificate');
    const downloadBtn = document.getElementById('downloadBtn');
    
    try {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
 
        const scale = window.innerWidth <= 768 ? 1 : 2;
        
        const canvas = await html2canvas(certificate, {
            scale: scale,
            backgroundColor: 'white',
            logging: false,
            useCORS: true,
            allowTaint: true,
            imageTimeout: 0,
            removeContainer: true,
            letterRendering: true
        });
 
        const userName = document.getElementById('memberName').value.trim();
        const fileName = `RifleClub-${userName.replace(/[^a-z0-9]/gi, '_')}.png`;
 
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
 
    } catch (err) {
        console.error('Error generating certificate:', err);
        alert('There was an error generating your certificate. Please try again.');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Certificate';
    }
 }
 
 document.getElementById('memberName').addEventListener('focus', function() {
    if(window.innerWidth <= 768) {
        setTimeout(() => {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
 });
 
 document.querySelectorAll('.trivia-option').forEach(option => {
    option.addEventListener('touchstart', function() {
        this.style.backgroundColor = 'rgba(255, 51, 51, 0.2)';
    });
    
    option.addEventListener('touchend', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
 });
 
 const viewport = document.querySelector('meta[name=viewport]');
 const viewportContent = viewport.getAttribute('content');
 
 document.getElementById('memberName').addEventListener('focus', () => {
    if(window.innerWidth <= 768) {
        viewport.setAttribute('content', viewportContent + ', maximum-scale=1');
    }
 });
 
 document.getElementById('memberName').addEventListener('blur', () => {
    viewport.setAttribute('content', viewportContent);
 });