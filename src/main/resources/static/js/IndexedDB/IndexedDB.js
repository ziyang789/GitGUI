/*
 * @Author: iYiu
 * @Date: 2021-09-09 15:24:21
 * @LastEditors: iYiu
 * @LastEditTime: 2021-09-10 14:49:05
 * @FilePath: \IndexedDB\IndexedDB.js
 */
/**  使用方法
  *  let db = new DB('web_DB', 'nav_text')
  *  let data = {name:'管理员', roleId: 1, type: 1};
  *  db.save('list',data).then((res)=>{
  *      console.log(res,'存储成功')
  *  })
  *  
  *  db.get('list').then((res)=>{
  *      console.log(res,'查询成功')
  *  })
  *  db.delete('list').then(res=>{
  *      console.log(res,'删除成功---->>>>>>name')
  *  })
  *  db.deleteAll().then(res=>{
  *      console.log(res,'清除数据库---->>>>>>name')
  *  })
 */
class DB {
    constructor(dbName,formName){
        this.dbName = dbName;
        this.slqVersion = '1'; //websql的版本号，由于ios的问题，版本号的写法不一样
        this.dbVersion = 1; //indexDB的版本号
        this.storeName = formName; //store----即“表”的名字
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, //监听IndexDB
        this.db = {}; //缓存数据库，避免同一个页面重复创建和销毁
        this.store = null;
        this.errorCode = {
            //错误码
            success: 200, //成功
            error: 401, //key不存在
            open: 91001, //打开数据库失败的错误
            save: 91002, //保存数据失败的错误
            get: 91003, //获取数据失败的错误
            delete: 91004, //删除数据失败的错误
            deleteAll: 91005, //清空数据库失败的错误
        }
    }
    //创建“表”
    createStore(dbName) {
        let txn, store;
        if (this.indexedDB) {
            //如果是支持IndexDB的
            txn = this.db[dbName].transaction(this.storeName, 'readwrite'); //IndexDB的读写权限
            store = txn.objectStore(this.storeName);
        }
        return store;
    }
    open(callback, dbName) {
        let that = this;
        //打开数据库
        if (that.indexedDB) {
            //如果支持IndexDB
            if (!that.db[dbName]) {
                //如果缓存中没有，则进行数据库的创建或打开，提高效率
                let request = that.indexedDB.open(dbName, that.dbVersion);
                request.onerror = function (e) {
                    callback({ code: that.errorCode.open, error: e });
                };
                request.onsuccess = function (e) {
                    if (!that.db[dbName]) {
                        that.db[dbName] = e.target.result;
                    }
                    let store = that.createStore(dbName);
                    callback(store);
                };
                request.onupgradeneeded = function (e) {
                    that.db[dbName] = e.target.result;
                    let store = that.db[dbName].createObjectStore(that.storeName, {
                        keyPath: 'key',
                    });
                    callback(store);
                };
            } else {
                //如果缓存中已经打开了数据库，就直接使用
                let store = that.createStore(dbName);
                callback(store);
            }
        }
    }
    save(kay, value) {
        //保存数据到数据库  kay---数据key  value----数据值 
        let that = this;
        if (that.indexedDB) {
            return new Promise((resolve, reject) => {
                let dbName = that.dbName;
                let inData = {
                    key: kay,
                    value: value,
                };
                that.open(function (result) {
                    let error = result.hasOwnProperty('error');
                    if (error) {
                        resolve(result);
                    } else {
                        let request = result.put(inData);
                        request.onsuccess = function (e) {
                            resolve({ code: that.errorCode.success, success: true }); //保存成功有success 字段
                        };
                        request.onerror = function (e) {
                            resolve({ code: that.errorCode.save, error: e });
                        };
                    }
                }, dbName);
            });
        }
    }
    get(kay) {
        //根据key获取值
        let that = this;
        return new Promise((resolve, reject) => {
            let dbName = that.dbName;
            if (that.indexedDB) {
                that.open(function (result) {
                    let error = result.hasOwnProperty('error'); //判断返回的数据中是否有error字段
                    if (error) {
                        reject(result);
                    } else {
                        let request = result.get(kay);
                        request.onsuccess = function (e) {
                            let result = e.target.result
                            let data = result? result.value : undefined;
                            resolve({ code: data?that.errorCode.success:that.errorCode.error, data: data||[], success: true });
                        };
                        request.onerror = function (e) {
                            reject({ code: that.errorCode.get, error: e });
                        };
                    }
                }, dbName);
            }
        });
    }
    delete(key) {
        let that = this;
        return new Promise((resolve, reject)=>{
            //根据key删除某条数据
            let dbName = that.dbName;
            if (that.indexedDB) {
                that.open(function (result) {
                    let error = result.hasOwnProperty('error');
                    if (error) {
                        resolve(result);
                    } else {
                        let request = result.get(key);
                        request.onsuccess = function (e) {
                            let recode = e.target.result;
                            if (recode) {
                                request = result.delete(key);
                            }
                            resolve({ code: recode?that.errorCode.success:that.errorCode.error, success: true });
                        };
                        request.onerror = function (e) {
                            resolve({ code: that.errorCode.delete, error: e });
                        };
                    }
                }, dbName);
            }
        })
    }
    deleteAll() {
        let that = this;
        return new Promise((resolve, reject)=>{
            //清空数据库
            let dbName = that.dbName;
            if (that.indexedDB) {
                that.open(function (result) {
                    let error = result.hasOwnProperty('error');
                    if (error) {
                        resolve(result);
                    } else {
                        result.clear();
                        resolve({ code: that.errorCode.success, success: true });
                    }
                }, dbName);
            }
        })
    }
}