var myDaltonicDriver = (function () {
    var file;

    function onLoad() {
        var averageRGB = getAverageRGB(getImgData(document.getElementById("normalView")));
         document.body.style.background = "rgb(" + averageRGB.r + "," + averageRGB.g + "," + averageRGB.b + ")";
        // invertColors(getImgData(document.getElementById("normalView")));
        //deutan(getImgData(document.getElementById("normalViewParrot")));
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
        var i;

        //0 red; 1 green; 2 blue; 3 alpha;
        //aplicar palete de cores que nos casos de deuteranopia são substituidos pela cor amarela
        for (i = 0; i < imgData.data.length; i += 4) {
            //Predomina a cor vermelha
            if (imgData.data[i] > imgData.data[i + 1] && imgData.data[i] > imgData.data[i + 2]) {
                imgData.data[i + 1] = imgData.data[i];
            }
            //Predomina a cor verde
            if (imgData.data[i + 1] > imgData.data[i] && imgData.data[i + 1] > imgData.data[i + 2]) {
                imgData.data[i + 1] = imgData.data[i];
            }
            //predomina a cor vermelha com a cor verde o que produz um amarelo (amarelo com vermelho produz laranja)
            if (imgData.data[i + 1] > imgData.data[i + 2] && imgData.data[i] > imgData.data[i + 2]) {
                imgData.data[i + 1] = imgData.data[i];
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
        //Não sei se é uma questão de limitação do servidor ou do canvas
        //mas nao posso manipular imagens superiores a 125x125, terei de fazer clip das mesmas
        context.drawImage(img,0,0,125,125);
        try {
            imgData = context.getImageData(0, 0, img.width, img.height);
        } catch (e) {
            alert(e);
            return undefined;
        }
        return imgData;
    }

    function deutanLoad() {
        deutan(getImgData(document.getElementById("normalViewParrot")));
    }

    return {
        load: onLoad,
        deuteranopia: deutanLoad
    };
})();