async function generateHash() {
    const inputString = document.getElementById('inputString').value;
    const salt = document.getElementById('salt').value;
    
    // If either inputString or salt is empty, clear the output
    if (!inputString || !salt) {
        document.getElementById('hashedOutput').value = '';
        return;
    }

    // Combine string and salt
    const combined = inputString + salt;
    
    // Encode as UTF-8 and hash using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(combined);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Convert hash to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Display the hash in the output area
    document.getElementById('hashedOutput').value = hashHex;
}

function copyToClipboard() {
    const hashedOutput = document.getElementById('hashedOutput');
    
    // Select and copy the hashed output
    hashedOutput.select();
    hashedOutput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
}
