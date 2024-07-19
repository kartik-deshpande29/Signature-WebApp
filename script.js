const colorPicker = document.getElementById('colorPicker');
        const canvasColor = document.getElementById('canvasColor');
        const canvas = document.getElementById('myCanvas');
        const clearButton = document.getElementById('clearButton');
        const saveButton = document.getElementById('saveButton');
        const penSize = document.getElementById('penSize');
        const retrieveButton = document.getElementById('retrieveButton');
        
        const ctx = canvas.getContext('2d'); 

        colorPicker.addEventListener('change', (e) => {
            ctx.strokeStyle = e.target.value;
            ctx.fillStyle = e.target.value;
        });

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            lastX = e.offsetX;
            lastY = e.offsetY;
        });

        canvas.addEventListener('mousemove', (e) => {
            if(isDrawing) {
                ctx.lineWidth = penSize.value;
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                lastX = e.offsetX;
                lastY = e.offsetY;
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        canvasColor.addEventListener('change', (e) => {
            ctx.fillStyle = e.target.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        penSize.addEventListener('change', (e) => {
            ctx.lineWidth = e.target.value;
        });

        clearButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        saveButton.addEventListener('click', () => {
            //converts into base64 encoded data URI
            localStorage.setItem('savedSignature', canvas.toDataURL());   
            let link = document.createElement('a');

            link.download = 'signature.png';
            link.href = canvas.toDataURL();
            link.click();
        });

        retrieveButton.addEventListener('click', () => {
            let savedCanvas = localStorage.getItem('savedSignature');
            
            if (savedCanvas) {
                let img = new Image();
                img.src = savedCanvas;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                }
            }
        });