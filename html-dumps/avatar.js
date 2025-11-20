const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("imageUpload");
const downloadBtn = document.getElementById("downloadBtn");

const template = new Image();
template.src = "assets/images/avatar.png";

template.onload = () => {
    canvas.width = template.width;
    canvas.height = template.height;
    ctx.drawImage(template, 0, 0);
};

upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw template background
        ctx.drawImage(template, 0, 0);

        // Circle center and radius (adjust these to match the template)
        const circleX = canvas.width / 2;
        const circleY = canvas.height / 2 - 30; 
        const radius = canvas.width * 0.30; 

        // Clip circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw uploaded image centered inside circle
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

        // Redraw template overlay (to cover edges)
        ctx.drawImage(template, 0, 0);
    };
});

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
