var heshaxpy = {
    chunk: function(array, size=1) {
        var result = []   //创建一个外层数组
        var arr = []   //内层数组
        var l = 0    //内层数组长度表示

        if (size < 1) {    //输入size参数小于1，按size = 1处理
            size = 1
        }

        for (var i = 0; i < array.length; i++) {     
            arr.push(array[i])       //遍历数组，挨个放进内层数组
            l++                     //同时记录内层数组长度
            if (l == size) {        //等于要求的size时，把此数组放进result内
                result.push(arr)
                arr = []             //放入第一次的数组后，清空该内层数组
                l = 0               //清空该长度值
            }
        }
        if (l != 0 ) {              //循环结束后还有剩余的元素，全部放进result里
            result.push(arr)  
        }
        return result
    },


    join: function(array, separator = ','){  
       
        var s = '' + array[0]         //字符串拼接数组第0项

        for (var i = 1; i < array.length; i++) {    //从第1项开始遍历
            s +=  '' + separator + array[i]     //最新的结果 字符串加上等于操作符+数组元素
        }
        return s
    },



    last: function(array) {
        return array[array.length - 1]
    },


    lastIndexOf: function(array, value, fromIndex=array.length-1) {
        if (fromIndex < 0) {     //小于0直接返回-1
            return -1
        }
        if (fromIndex > array.length - 1) {     
            fromIndex = array.length - 1
        }

        for (var i = fromIndex; i >= 0; i--) {    //直接从给定起始点开始返回索引
            if (array[i] == value){
                return i
            }
        }
        return i
    },


    drop: function(array, n = 1) {
        var result = []

        for (var i = n; i < array.length; i++) {
            result.push(array[i])
        }
        return result
    },

    dropright: function(array, n = 1) {
        if (array.length < n) {    //数组长度小于n，直接返回空数组
            return []
        }
        var rest = array.length - n    //去掉n个数剩下的长度
        return array.slice(0, rest)   
    },

    fill:function(array, value, start=0, end=array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value 
        }
        return array
    },

    findIndex: function(array, predicate=_.identity, fromIndex=0) {

    },

    flatten: function (array) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {   //判断是不是数组
                result.push(...array[i])    //数组展开push
            } else {                        //不是数组直接push
                result.push(array[i])  
            }
        }
        return result
    },

    flattenDeep: function(array, result = []){    //result声明
        
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {        //判断是不是数组
                this.flattenDeep(array[i])   //递归
            } else {                        
                result.push(array[i])  
            }
        }
        return result
    },

    flattenDepth: function(array, depth=1) {

    },

    


    fromPairs: function(pairs) {
        var obj = {}
        
        for (var i = 0; i < pairs.length; i++){
            obj[pairs[i][0]] = pairs[i][1]     //对象 obj[k属性] = n值
        }
        return obj
    },

    head: function(array) {
        return array[0]
    },

    indexOf: function(array, value, fromIndex=0) {
        if (fromIndex < 0) {        //起始值小于0时，去掉后面的偏移量
            array.length = array.length + fromIndex
        }
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] == value) {
                return i
            }
        }
        return -1       //不符合的返回-1
    },

    reverse: function(array) {
        var result = []

        for (var i = array.length - 1; i >=0; i--) {
            result.push(array[i])
        }
        return result
    },

    sortedIndex: function(array, value) {
        var length =array.length
        var left = array[0]
        var right = array[length - 1]
        var mid = left + Math.floor((right - left) / 2)

        for (var i = 0; i < length; i++) {
            if (mid == value) {
                return  mid
            } else if (mid > value) {
                right = mid
            }
        }

    },








    initial: function (array) {
        return array.slice(0, array.length - 1)
    },


}