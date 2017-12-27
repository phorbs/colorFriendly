var myDaltonicDriver = (function () {
    var file;

    function onLoad() {
        var img = document.getElementById("normalView");
        var averageRGB = getAverageRGB(getImgData(img));
        document.body.style.background = "rgb(" + averageRGB.r + "," + averageRGB.g + "," + averageRGB.b + ")";
        invertColors(getImgData(document.getElementById("normalView")));
        deutan(getImgData(document.getElementById("normalView")));
    }

    //protan; deutan; titan
    //deutan ausencia da cor verde e vermelho
    function deutan(imgData) {
        var canvas = document.createElement("canvas");
        canvas.height = imgData.height;
        canvas.width = imgData.width;
        //por causa do bootstrap nao fica alinhado
        canvas.style = "vertical-align:middle";

        var context = canvas.getContext("2d");
        context.drawImage(document.getElementById("normalView"), 0, 0);
        var i;
        //0 red; 1 green; 2 blue; 3 alpha;
        //aplicar palete de 15 cores do tipo deuteranopia
        for (i = 0; i < imgData.data.length; i += 4) {

            if (imgData.data[i] == 0 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0) {
                imgData.data[i] = 26;
                imgData.data[i + 1] = 26;
                imgData.data[i + 2] = 26;
            }

            if ((imgData.data[i + 1] / imgData.data[i] >= 1.5) && (imgData.data[i + 1] / imgData.data[i + 2] >= 1.5)) {
                imgData.data[i] = imgData.data[i] * 2;
                imgData.data[i+2] = imgData.data[i+2] * 2;
            }

        }
        context.putImageData(imgData, 0, 0);
        document.getElementById("gallery").appendChild(canvas);
    }

    function invertColors(imgData) {
        //https://www.w3schools.com/tags/canvas_getimagedata.asp
        //https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_getimagedata2
        var canvas = document.createElement("canvas");
        canvas.height = imgData.height;
        canvas.width = imgData.width;
        //por causa do bootstrap nao fica alinhado
        canvas.style = "vertical-align:middle";

        var context = canvas.getContext("2d");
        context.drawImage(document.getElementById("normalView"), 0, 0);
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i + 1] = 255 - imgData.data[i + 1];
            imgData.data[i + 2] = 255 - imgData.data[i + 2];
            imgData.data[i + 3] = 255;
        }
        context.putImageData(imgData, 0, 0);
        document.getElementById("gallery").appendChild(canvas);
    }

    function getAverageRGB(imgData) {
        var rgb = { r: 0, g: 0, b: 0 };
        var i;
        if (imgData != undefined) {

            for (i = 0; i < imgData.data.length; i += 4) {
                //0 red; 1 green; 2 blue; 3 alpha;
                rgb.r += imgData.data[i];
                rgb.g += imgData.data[i + 1];
                rgb.b += imgData.data[i + 2];
            }
            //em blocos de 4 por isso i * 4 dá o total de blocos
            rgb.r = Math.floor(rgb.r / (i / 4));
            rgb.g = Math.floor(rgb.g / (i / 4));
            rgb.b = Math.floor(rgb.b / (i / 4));
            return rgb;
        }
    }

    function getImgData(img) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var imgData;
        context.drawImage(img, 0, 0);
        try {
            imgData = context.getImageData(0, 0, img.width, img.height);
        } catch (e) {
            alert(e);
            return undefined;
        }
        return imgData;
    }

    return {
        load: onLoad
    };
})();