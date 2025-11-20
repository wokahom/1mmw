const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("imageUpload");
const downloadBtn = document.getElementById("downloadBtn");

// Load template
const template = new Image();
template.src = "assets/images/template_transparent.png";

// When template loads, draw it
template.onload = () => {
    canvas.width = template.width;
    canvas.height = template.height;
    drawTemplate();
};

// Draw the template
function drawTemplate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0);
}

// Upload image preview
upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        // Redraw template
        drawTemplate();

        // Circle position & size (calculated for your design)
        const circleX = 400;  // center X
        const circleY = 531;  // center Y
        const radius = 288;   // radius

        // Clip for circular image
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
        ctx.clip();

        // Scale uploaded image to fill circle properly
        const scale = Math.max(
            (radius * 2) / img.width,
            (radius * 2) / img.height
        );

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        // Center image inside circle
        ctx.drawImage(
            img,
            circleX - newWidth / 2,
            circleY - newHeight / 2,
            newWidth,
            newHeight
        );

        ctx.restore();

        // Draw template again to cover edges
        ctx.drawImage(template, 0, 0);
    };
});

// Download final result
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
