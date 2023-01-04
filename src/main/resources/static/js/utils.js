/**
 * author: ziyang789
 * date: 2022/5/19
 * github: github.com/ziyang789
 */

/**
 * HTML加载字体文件url
 * @param urls
 */
function loadFont(urls) {
    /*if (!tf){
        //"url(data:font/woff;charset=utf-8;base64,xxxxxxx)"
        myFonts = new FontFace('myFont', "url(data:application/octet-stream;charset=utf-8;base64," + urls + ")",{display: 'swap'});
    }*/
    var myFonts = new FontFace('myFont', "url(" + urls + ")",{display: 'swap'});
    myFonts.load().then(function(loadFace){
        document.fonts.add(loadFace);
        // 给body设置字体样式 Arial为后补字体
        document.body.style.fontFamily = 'myFont, Arial';
        //或者单独给元素设置
        var box = document.getElementsByClassName("box");
        for (var i = 0; i < box.length; i++) {
            box[i].style.fontFamily = "myFont, Arial";
        }
    });
}

function getUUID() { //获取唯一的UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * base64转file对象
 * @param dataurl
 * @param filename
 * @returns {File}
 */
function base64toFile (dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let suffix = mime.split('/')[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    })
}

/**
 * file转url
 * @param file
 * @returns {*}
 */
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/**
 * 将base64转换为blob
 * @param dataurl
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * 将blob转换为file
 * @param theBlob
 * @param fileName
 * @returns {*}
 */
function blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

/**
 * blob二进制 to base64
 * @param blob
 * @param callback
 */
function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    }
    reader.readAsDataURL(blob);
}