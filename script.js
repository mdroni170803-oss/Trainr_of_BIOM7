// Sidebar Toggle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Backup Functionality
function backupData() {
    const data = JSON.stringify(localStorage); // বর্তমান সব লোকাল ডেটা নিচ্ছে
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biom_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Restore Functionality
function restoreData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.clear();
            for (const key in data) {
                localStorage.setItem(key, data[key]);
            }
            alert("ডেটা সফলভাবে রিস্টোর হয়েছে! পেজটি রিলোড হবে।");
            location.reload();
        } catch (err) {
            alert("ভুল ফাইল সিলেক্ট করেছেন। দয়া করে সঠিক JSON ফাইল দিন।");
        }
    };
    reader.readAsText(file);
}
