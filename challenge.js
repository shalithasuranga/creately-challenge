    /*
    Written by Shalitha
    Simple Pixel level Edge Detector  
    */
    
    let A = []; // 2D array for original image area
    let B = []; // 2D array for the outline data
    let imgData; // complete image data object
    let canvas, outline;
    let ctx, ctx2;
    let stroke = 1;

    window.onload = () => {
        setupCanvas();
    };

    let setupCanvas = () => {
        canvas = document.getElementById('main');
        outline = document.getElementById('outline');
        ctx = canvas.getContext('2d');
        ctx2 = outline.getContext('2d');
    };


    let drawImage = () => {
        let img = new Image(60,60);
        img.src = 'https://image.flaticon.com/icons/svg/506/506937.svg';
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            ctx.drawImage(img, 50, 50, 150, 150);
        };
    };

    let drawObject = () => {
        ctx.beginPath();
        ctx.rect(25, 25, 200, 200);
        ctx.fillStyle="blue";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="green";
        ctx.rect(200, 300, 20, 20);
        ctx.fill();
        ctx.stroke();
        var radius = 70;
        ctx.beginPath();
        ctx.arc(150, 250, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
    };

    let drawOutline = () => {
        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let a = [];
        for(let i = 0; i < canvas.width; i++) a.push(0);
        for(let i = 0; i < canvas.height; i++){
            A.push(a.slice());
            B.push(a.slice());
        }

        /* Save image data to 2D array A */
        let xi = 0;
        let yi = 0;
        for(let i = 3 ; i < imgData.length; i+=4){
            xi ++;
            if(xi % canvas.width == 0){
                xi = 0;
                yi ++;
            }
            if(xi < canvas.width && yi < canvas.height){
                A[xi][yi] = imgData[i] > 0 ? 1 : 0;
            }
        }

        /* Save the outline to 2D array B */
        for(let i = 0;  i < A.length; i++ ){
            for(let j = 0; j < A[i].length; j++){
                if(A[i][j] == 1) {
                    try {
                        /* Edge Detector Filter - Diagonal included */
                        let vx = [-1, 0, 1, 1, 1, 0, -1, -1];
                        let vy = [1, 1, 1, 0, -1, -1, -1, 0];
                        /* Edge Detector Filter - Diagonal excluded */
                        //let vx = [ 0, 1, 0, -1];
                        //let vy = [1, 0, -1, 0];
                        for(let k = 0 ; k < vx.length; k++){
                            if(i + vx[k] >= 0 && i + vx[k] <= canvas.width && j + vy[k] >= 0 && j + vy[k] <= canvas.height) {
                                if(A[i + vx[k]][j + vy[k]] == 0){
                                    /* Put 1 for all outer pixels */
                                    for(let k = 0 ; k < vx.length; k++){
                                        if(A[i + vx[k]][j + vy[k]] == 0) 
                                            B[i + vx[k]][j + vy[k]] = 1;
                                    }
                                    B[i][j] = 1;
                                }
                            }
                        }

                    }
                    catch(e) {

                    }
                }
            }
        }

        /* Reder the saved outline to both canvases */
        for(let i = 0;  i < B.length; i++ ){
            for(let j = 0; j < B[i].length; j++){
                if(B[i][j] == 1) {
                    ctx.beginPath();
                    try {
                        ctx.fillStyle="#e6ad1f";
                        ctx.fillRect(i - 1, j, stroke, stroke); 
                    }
                    catch(e){

                    }
                    ctx.fillStyle="#e6ad1f";
                    ctx2.beginPath();
                    try {
                        ctx2.fillStyle="#e6ad1f";
                        ctx2.fillRect(i - 1, j, stroke, stroke);
                    }
                    catch(e){

                    }
                }
            }
        }

    };
