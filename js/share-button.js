document.getElementById("shareBtn").addEventListener("click", () => {
    if (navigator.share) {
        navigator.share({
            title: "One Million Man Worship",
            text: "I will be there LIVE! 19th–21st Dec 2025 @ Yakubu Gowon Stadium PH.",
            url: window.location.href
        }).catch(err => console.log("Share failed:", err));
    } else {
        alert("Sharing not supported on this device.");
    }
});
