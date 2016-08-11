function getColor() {
    // // DELTE THIS WHEN COLOR PICKER IS WORKING
    // if (currentColor === '#cc00cc') {
    //     currentColor = '#000000';
    // } else {
    //     currentColor = '#cc00cc';
    // }

    var canvasPlace = document.getElementById('colorpicker');
    canvasPlace.style.display = 'block';
    var canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.float = 'left';
    var ctx = canvas.getContext('2d');
    canvasPlace.appendChild(canvas);
    canvas.width = 256;
    canvas.height = 256;
    canvas.style.border = '8px solid yellowgreen';

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function drawColor(color) {
        currentColor = color;
        applyNewColorToCurrentActiveShape();
    }

    function init(imageObj) {
        var mouseDown = false;

        // canvas.addEventListener('mouseout', function () {
        //     canvas.remove();
        // });
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;

        $('#colorpicker').on('mousedown', function (evt) {
            if(!(evt.target instanceof HTMLCanvasElement)){
                return;
            }
            mouseDown = true;
            var color,
                mousePos = getMousePos(canvas, evt);

            // currentColor = undefined;
            color = undefined;

            if (mousePos !== null && mousePos.x > mousePos.x < imageObj.width && mousePos.y > mousePos.y < imageObj.height) {
                var x = mousePos.x;
                var y = mousePos.y;
                var imgData = ctx.getImageData(x, y, 1, 1);
                var data = imgData.data;
                color = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
                drawColor(color);
            }
        });

        $('#colorpicker').on('mouseup', function (evt) {
            if(!(evt.target instanceof HTMLCanvasElement)){
                return;
            }

            mouseDown = false;
            canvas.remove();
            canvasPlace.style.display = 'none';
        });

        $('#colorpicker').on('mousemove', function (evt) {
            var color,
                mousePos = getMousePos(canvas, evt);

            // currentColor = undefined;
            color = undefined;
            if (mouseDown && mousePos !== null && mousePos.x > mousePos.x < imageObj.width && mousePos.y > mousePos.y < imageObj.height) {
                var x = mousePos.x;
                var y = mousePos.y;
                var imgData = ctx.getImageData(x, y, 1, 1);
                var data = imgData.data;
                color = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';

                drawColor(color);
            }
        });

        ctx.drawImage(imageObj, 0, 0);

        // This changes shape coloer, since default is not balck.
        // Should Shape Default color be black ( can change in global-varialbes.js, initialze currentColor to black/ whatever ) ? 
        // drawColor('black');
    }

    var imageObj = new Image();
    imageObj.onload = function () {
        init(this);
    };

    imageObj.crossOrigin = '';
    imageObj.src = './images/colorpicker.png';
}