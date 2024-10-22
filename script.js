async function generateHash() {
    const inputString = document.getElementById("inputString").value;
    const salt = document.getElementById("salt").value;

    if (!inputString || !salt) {
        document.getElementById("hashedOutput").value = "";
        return;
    }

    const combined = inputString + salt;

    const encoder = new TextEncoder();
    const data = encoder.encode(combined);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    document.getElementById("hashedOutput").value = hashHex;
}

function copyToClipboard() {
    const hashedOutput = document.getElementById("hashedOutput");
    if (hashedOutput.value.length > 0) {
        navigator.clipboard
            .writeText(hashedOutput.value)
            .then(() => {
                showToast();
            })
            .catch((error) => {
                console.error("Failed to copy result: ", error);
            });
    }
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
