const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("imageUpload");
const downloadBtn = document.getElementById("downloadBtn");

const template = new Image();
template.src = "assets/images/template_transparent.png";  // your template here

// Load template first
template.onload = () => {
    canvas.width = template.width;
    canvas.height = template.height;
    drawTemplate();
};

function drawTemplate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0);
}

// When the user uploads an image
upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        drawTemplate();

        // Adjust these values when I get your transparent template
        const circleX = canvas.width / 2;       // center X
        const circleY = canvas.height / 2 - 30; // center Y
        const radius = canvas.width * 0.30;     // circle radius

        // Clip in circular shape
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
        ctx.clip();

        // Scale uploaded image to cover circle
        const scale = Math.max(
            (radius * 2) / img.width,
            (radius * 2) / img.height
        );

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        ctx.drawImage(
            img,
            circleX - newWidth / 2,
            circleY - newHeight / 2,
            newWidth,
            newHeight
        );

        ctx.restore();

        // Draw template again to hide rough edges (if needed)
        ctx.drawImage(template, 0, 0);
    };
});

// Download final avatar
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
