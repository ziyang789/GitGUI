/**
 * author: ziyang789
 * date: 2022/5/19
 * github: github.com/ziyang789
 */

/**
 * 打开数据库
 * @param dbName
 * @param storeName
 * @param version
 * @returns {IDBOpenDBRequest}
 */
;
function openDb(dbName, storeName, version = 1) {
    var indexedDB = window.indexedDB;
    const request = indexedDB.open(dbName, version);
    return request;
}

/**
 * 添加数据
 * @param db
 * @param storeName
 * @param data
 */
function addData(db, storeName, data) {
    let requestAdd = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

    requestAdd.onsuccess = function(event) {
        console.log('数据写入成功')
    };

    requestAdd.onerror = function(event) {
        console.log('数据写入失败')
    };
}

/**
 * 根据id获取数据
 * @param db
 * @param storeName
 * @param key
 * @returns {any}
 */
function getDataByKey(db, storeName, key) {
    let transaction = db.transaction([storeName]) // 事务
    let objectStore = transaction.objectStore(storeName) // 仓库对象
    let requestGet = objectStore.get(key)

    requestGet.onerror = function(event) {
        console.log('事务失败')
    };

    requestGet.onsuccess = function(event) {
        console.log('主键查询结果: ', requestGet.result)
        // return requestGet.result.name;
    };
    return requestGet.result;
}


/**
 * 根据id修改数
 * @param db
 * @param storeName
 * @param data
 */
function updateDB(db, storeName, data) {
    let requestUpdate = db.transaction([storeName], 'readwrite') // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data);

    requestUpdate.onsuccess = function() {
        console.log('数据更新成功')
    };

    requestUpdate.onerror = function() {
        console.log('数据更新失败')
    };
}

/**
 * 根据id删除数据
 * @param db
 * @param storeName
 * @param id
 */
function deleteDB(db, storeName, id) {
    let requestDelete = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

    requestDelete.onsuccess = function() {
        console.log('数据删除成功')
    };

    requestDelete.onerror = function() {
        console.log('数据删除失败')
    };
}

/**
 * 关闭数据库连接
 * @param db
 */
function closeDB(db) {
    db.close();
    console.log('数据库已关闭');
}

/**
 * 判断是否支持indexedDB执行下面函数
 */
function justifyIndexDEB(){
    if("indexedDB" in window) {
        // 支持
        console.log(" 支持indexedDB...");
    } else {
        // 不支持
        console.log("不支持indexedDB...");
    }
}

// 由于打开indexDB是异步的加个定时器避免 db对象还没获取到值导致 报错
/*setTimeout(() => {
    addData(db, "storeName", {
        id: new Date().getTime(), // 必须且值唯一
        name: '张三',
        age: 18,
        desc: 'helloWord'
    })
}, 1000);*/
/*
var dbName = 'helloIndexDB', version = 1, storeName = 'helloStore', db;
let request = openDb(dbName, storeName, version);

request.onsuccess = request.onsuccess = function(event) {
    db = event.target.result; // 数据库对象
    console.log('数据库打开成功')
    //TODO
    let transaction = db.transaction([storeName]) // 事务
    let objectStore = transaction.objectStore(storeName) // 仓库对象
    let requestGet = objectStore.get(15)

    requestGet.onerror = function(event) {
        console.log('事务失败')
    }

    requestGet.onsuccess = function(event) {
        console.log('主键查询结果: ', requestGet.result)
        let dataByKey = requestGet.result.name;
        if (dataByKey == "" || dataByKey == null || dataByKey == undefined){
            var oReq = new XMLHttpRequest();
            oReq.open("GET", "/open/socket/jumos", true);
            oReq.responseType = "blob";
            oReq.onload = function(oEvent) {
                var blob = oReq.response;
                blobToDataURI(blob, function (e) {
                    addData(db, storeName, {id: 15, name: e});
                    dataByKey = e;
                    console.log("请求二进制" + e)
                    return e;
                });
            };
            oReq.send();
        }

        let file = base64toFile(dataByKey);
        let url = getObjectURL(file);
        loadFont(url);
        closeDB(db);
    };
};

request.onerror = function(event) {
    console.log('数据库打开报错')
};

request.onupgradeneeded = function(event) {
    // 数据库创建或升级的时候会触发
    console.log('onupgradeneeded');
    db = event.target.result; // 数据库对象
    let objectStore;
    if (!db.objectStoreNames.contains(storeName)) {
        objectStore = db.createObjectStore(storeName, { keyPath: 'id' }) // 创建表
        // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
    }
};*/
