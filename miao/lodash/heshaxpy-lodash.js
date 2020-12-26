var heshaxpy = {

    chunk: function (array, size = 1) {
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
        if (l != 0) {              //循环结束后还有剩余的元素，全部放进result里
            result.push(arr)
        }
        return result
    },


    join: function (array, separator = ',') {

        var s = '' + array[0]         //字符串拼接数组第0项

        for (var i = 1; i < array.length; i++) {    //从第1项开始遍历
            s += '' + separator + array[i]     //最新的结果 字符串加上等于操作符+数组元素
        }
        return s
    },



    last: function (array) {
        return array[array.length - 1]
    },


    lastIndexOf: function (array, value, fromIndex = array.length - 1) {
        if (fromIndex < 0) {     //小于0直接返回-1
            return -1
        }
        if (fromIndex > array.length - 1) {
            fromIndex = array.length - 1
        }

        for (var i = fromIndex; i >= 0; i--) {    //直接从给定起始点开始返回索引
            if (array[i] == value) {
                return i
            }
        }
        return i
    },


    drop: function (array, n = 1) {
        var result = []

        for (var i = n; i < array.length; i++) {
            result.push(array[i])
        }
        return result
    },

    dropRight: function (array, n = 1) {
        if (array.length < n) {    //数组长度小于n，直接返回空数组
            return []
        }
        var rest = array.length - n    //去掉n个数剩下的长度
        return array.slice(0, rest)
    },

    fill: function (array, value, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value
        }
        return array
    },

    findIndex: function (array, predicate, fromIndex = 0) {
        for (var i = fromIndex; i < array.length; i++) {
            if (typeof predicate == 'function') {
                if (predicate(array[i])) {
                    return i
                }
            } else if (typeof predicate == 'string') {
                if (array[i][predicate] == true) {
                    return i
                }
            } else if (Array.isArray(predicate)) {
                var flag = true
                for (var j = 0; j < predicate.length; j += 2) {
                    if (array[i][predicate[j]] != predicate[j + 1]) {
                        flag = false
                        break
                    }
                }
                if (flag == true) {
                    return i
                }
            } else if (typeof predicate == 'object') {
                var flag = true
                for (key in predicate) {
                    if (predicate[key] != array[i][key]) {
                        flag = false
                        break
                    }
                }
                if (flag == true) {
                    return i
                }
            }
        }
        return -1
    },


    findLastIndex(array, predicate, fromIndex = array.length - 1) {
        for (var i = fromIndex; i >= 0; i--) {
            if (typeof predicate == "Function") {
                if (predicate(array[i])) {
                    return i
                }
            } else if (typeof predicate == 'String') {
                if (array[i][predicate] == true) {
                    return i
                }
            } else if (Array.isArray(predicate)) {
                var flag = true
                for (var j = 0; j < predicate.length; j += 2) {
                    if (array[i][predicate[j]] != predicate[j + 1]) {
                        flag = false
                        break
                    }
                }
                if (flag == false) {
                    return i
                }
            } else if (typeof predicate == 'Object') {
                var flag = true
                for (key in predicate) {
                    if (predicate[key] != array[i][key]) {
                        flag = false
                        break
                    }
                }
                if (flag == false) {
                    return i
                }
            }
        }
        return - 1
    },

    pull: function (array, ...values) {
        let result = []

        array.forEach(it => {
            if (!values.includes(it)) {
                result.push(it)
            }
        })
        return result
    },

    pullAll: function (array, values) {
        let result = []

        for (let val of array) {
            if (!values.includes(val)) {
                result.push(val)
            }
        }
        return result
    },

    pullAt: function (array, indexes) {
        let result = []
        indexes.forEach(it => {
            result.push(array[it])
        })
        return result
    },

    matches: function (source) {
        return (value) => this.isEqual(value, source)
    },


    isArguments: function (value) {
        return checkType(value, "Arguments")
    },

    isArray: function (value) {
        return checkType(value, "Array")
    },

    isArrayBuffer: function (value) {
        return checkType(value, "ArrayBuffer")
    },

    isBoolean: function (value) {
        return checkType(value, "Boolean")
    },

    isBuffer: function (value) {
        return checkType(value, "Buffer")
    },

    isDate: function (value) {
        return checkType(value, "Date")
    },
    isFunction: function (value) {
        return checkType(value, "Function")
    },

    isString: function (value) {
        return checkType(value, "String")
    },

    checkType: function (value, type) {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    },

    isEqual: function (x, y) {
        //判断string，number，boolean类型
        if (x === y) {
            return true
        }

        //判断 NaN
        if (x !== x || y !== y) {
            return true
        }
        if (x === null || y === null || typeof x !== "object" || typeof y !== "object") {
            return false
        }

        //只枚举自身属性
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false
        }

        for (let key in x) {
            if (!(key in y) || !isEqual(x[key], y[key])) {
                return false
            }
        }
        return true
    },


    xor: function (...arrays) {
        var result = []
        var map = {}

        arrays.forEach(it => {
            it.forEach(item => {
                if (item in map) {   //出现多次的标记累加
                    map[item] += 1
                } else {      //出现一次的标记为1
                    map[item] = 1
                }
            })
        })

        for (let key in map) {
            if (map[key] == 1) {   //筛选出一次
                result.push(+key)   //+key隐式类型转换，字符串转数字
            }
        }
        return result
    },



    zip: function (...arrays) {
        var result = []
        var result1 = []
        var result2 = []
        var map = {}

        arrays.forEach(it => {
            it.forEach(item => {
                if (item in map) {
                } else {
                    map[item] = +1
                }
            })
        })

        for (let key in map) {
            if (map[key] % 2 == 1) {   //筛选出一次
                result1.push(key)   //+key隐式类型转换，字符串转数字
            }
            if (map[key] % 2 == 0) {
                result2.push(key)
            }
        }
        result.push([result1, result2])
        return result
    },

    //const flatten = [].concat.apply.bind([].concat, [])
    flatten: function (...array) {
        return [].concat(...array)
        //return [].concat.apply([], array)
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

    flattenDeep: function (array, result = []) {    //result声明

        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {        //判断是不是数组
                result.push(...flattenDeep(array[i]))   //递归
            } else {
                result.push(array[i])
            }
        }
        return result
    },


    flattenDepth: function (array, depth = 1) {
        let result = array

        while (depth) {
            result = flatten(result)
            depth--
        }
        return result
    },

    intersection: function (array, ...arrays) {
        let result = []

        for (let key of arrays) {
            for (let item of key) {
                if (array.includes(item)) {
                    result.push(item)
                }
            }
            array = result
            result = []
        }
        return array
    },

    intersectionBy: function (...arrays) {
        let result = []
        let map = new Map()
        let array = new Array(...arrays)

        if (typeof iteratee == 'Function') {
            result.push(iteratee(intersection(arrays)))
        } else if (typeof iteratee == 'String') {

        }
    },




    fromPairs: function (pairs) {
        var obj = {}

        for (var i = 0; i < pairs.length; i++) {
            obj[pairs[i][0]] = pairs[i][1]     //对象 obj[k属性] = n值
        }
        return obj



    },

    head: function (array) {
        return array[0]
    },

    indexOf: function (array, value, fromIndex = 0) {
        if (fromIndex < 0) {        //起始值小于0时,从0开始
            fromIndex = 0
        }
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] == value) {
                return i
            }
        }
        return -1       //不符合的返回-1
    },

    reverse: function (array) {
        var result = []

        for (var i = array.length - 1; i >= 0; i--) {
            result.push(array[i])
        }
        return result
    },

    sortedIndex: function (array, value) {
        var length = array.length
        var left = array[0]
        var right = array[length - 1]
        var mid = left + Math.floor((right - left) / 2)

        for (var i = 0; i < length; i++) {
            if (mid == value) {
                return mid
            } else if (mid > value) {
                right = mid
            }
        }

    },








    initial: function (array) {
        return array.slice(0, array.length - 1)
    },

    max: function (array) {
        if (array.length == 0) {
            return undefined
        }
        var max = -Infinity

        for (var i = 0; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i]
            }
        }
        return max
    },


    maxBy: function (array, m) {
        var max = {}

        if (typeof m == 'function') {
            for (var i = 0; i < array.length; i++) {
                for (let key in array[i]) {
                    if (array[i][key] > max[key]) {
                        return max[key] = array[i][key]
                    }
                }
            }
        }

        return max
    },

    min: function (array) {
        if (array.length == 0) {
            return undefined
        }
        var min = Infinity

        for (var i = 0; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i]
            }
        }
        return min
    },

    minBy: function (array, iteratee) {

    },


    sum: function (array) {
        var sum = 0

        for (var i = 0; i < array.length; i++) {
            sum += array[i]
        }
        return sum
    },


    sumBy: function (array, iteratee = _.identity) {

    },

    curry: function (func, arity = func.length) {

    },

    toArray: function (value) {
        var result = []


        if (typeof value == 'string') {
            result = value.split('')
        }

        if (typeof value == 'object') {
            for (let key in value) {      //是遍历对象的所有属性
                result.push(value[key])   //对象的所有值都push进result
            }
        }
        return result
    },

    every: function (collection, p) {
        if (typeof p == 'function') {
            for (let key in collection) {
                if (!p(collection[key])) {
                    return false
                }
            }
        } else if (typeof p == 'string') {
            for (let key in collection) {
                if (!collection[key][p]) {
                    return false
                }
            }
        } else if (Array.isArray(p)) {
            for (let key in collection) {
                for (var i = 0; i < p.length; i += 2) {
                    if (collection[key][p[i]] != p[i + 1]) {
                        return false
                    }
                }

            }
        } else if (typeof p == 'object') {
            for (let key in collection) {
                for (let key2 in p) {
                    if (collection[key][key2] != p[key2]) {
                        return false
                    }
                }
            }
        }
        return true
    },

    size: function (col) {
        if (typeof col == 'object' && !Array.isArray(col)) {
            var arr = Object.keys(col)
            return arr.length
        }
        return col.length
    },

    union: function (...arrays) {     //多个数组
        var result = []

        arrays.forEach(item => {     //遍历arrays的每一项

            item.forEach(it => {         //遍历arrays拆开后item的每一项
                if (!result.includes(it)) {  //如果result里不包含item里的元素
                    result.push(it)   //不重复的项都放进result里
                }
            })
        })
        return result
    },



    uniq: function (array) {
        var result = []

        array.forEach(it => {
            if (!result.includes(it)) {
                result.push(it)
            }
        })
        return result
    },


    without: function (array, ...value) {
        var result = []
        array.forEach(it => {
            if (!value.includes(it)) {
                result.push(it)
            }
        })
        return result
    },



    tail: function (array) {
        return array.slice(1)
    },



    take: function (array, n = 1) {
        var result = []

        for (var i = 0; i < array.length; i++) {
            if (i < n) {
                result.push(array[i])
            }
        }
        return result
    },

    takeRight: function (array, n = 1) {
        var result = []
        index = array.length - n

        if (array.length < n) {
            return array
        }

        for (var i = index; i < array.length; i++) {
            result.push(array[i])
        }
        return result
    },

    compact: function (array) {
        var result = []

        array.forEach(it => {
            if (it == '' || it == false || it == null || it == 0 || it == undefined || it != it) {

            } else {
                result.push(it)
            }
        })
        return result
    },

    difference: function (array, ...values) {
        var result = []
        var flag = false

        array.forEach(it => {
            flag = false

            values.forEach(item => {
                for (var i = 0; i < item.length; i++) {
                    if (it == item[i]) {
                        flag = true
                        break
                    }
                }
            })

            if (flag == false) {
                result.push(it)
            }
        })
        return result
    },

    concat: function (array, ...values) {
        var result = array.slice()     //返回新数组

        values.forEach(item => {
            if (Array.isArray(item)) {
                result.push(...item)
            } else {
                result.push(item)
            }
        })
        return result
    },

    identity: a => a,

    mean: function (array) {
        let sum = 0
        for (var i = 0; i < array.length; i++) {
            sum += array[i]
        }
        return sum / array.length
    },

    meanBy: function (array, iteratee) {

    },

    toArray: function (val) {
        let result = []

        if (val == null || val == 1) {
            return []
        } else if (typeof val == 'string') {
            return val.split('', val.length)
        } else if (typeof val == 'object') {
            for (let key in val) {
                result.push(val[key])
            }
        }
        return result
    },

    toFinite: function (val) {
        if (val !== val) {
            return 0
        }
        if (val === Infinity) {
            return Number.MAX_VALUE
        } else if (val === -Infinity) {
            return -Number.MAX_VALUE
        } else {
            return Number(val)
        }

    },

    toInterger: function (val) {
        let num = toFinite(val)
        return Math.floor(num)
    },

    toLength: function (val) {
        let a = Math.pow(2, 32) - 1
        if (val > a) {
            return a
        } else {
            return toInterger(val)
        }
    },

    toNumber: function (val) {
        return Number(val)
    },

    add: function (x, y) {
        return x + y
    },

    ceil: function (num, pre = 0) {

    },

    divide: function (x, y) {
        return x / y
    },

    floor: function (num, pre = 0) {

    },


    pad: function (string = '', length = 0, chars = ' ') {

        let l = length - string.length
        let n = chars.length

        if (l <= 0) {
            return string
        } else if (l > 0) {
            let a = Math.floor(l / 2)
            let b = Math.ceil(l / 2)
            let x = Math.floor(a / n)
            let x1 = a % n
            let y = Math.floor(b / n)
            let y1 = b % n
            return chars.repeat(x) + chars.slice(0, x1) + string + chars.repeat(y) + chars.slice(0, y1)
        }
    },


    padEnd: function (string = '', length = 0, chars = ' ') {
        let l = length - string.length
        let n = chars.length

        if (l <= 0) {
            return string
        } else if (l > 0) {

            let x = Math.floor(l / n)
            let x1 = l % n

            return string + chars.repeat(x) + chars.slice(0, x1)
        }
    },


    padStart: function (string = '', length = 0, chars = ' ') {
        let l = length - string.length
        let n = chars.length

        if (l <= 0) {
            return string
        } else if (l > 0) {

            let x = Math.floor(l / n)
            let x1 = l % n

            return chars.repeat(x) + chars.slice(0, x1) + string
        }
    },

    parseInt: function (string, radix = 10) {
        return parseInt(string, radix)
    },

    repeat: function (string = '', n = 1) {
        return string.repeat(n)
    },

    replace: function (string = '', p, replacement) {
        return string.replace(p, replacement)
    },

    snakeCase: function (string = '') {

    },


    split: function (string = '', s, limit) {
        let result = []

        for (var i = 0; i < string.length; i++) {
            if (string[i] != s) {
                result.push(string[i])
            }
        }
        return result.slice(0, limit)
    },


    unescape: function (string = '') {

        if (string.includes("&amp;")) {
            string = string.replace("&amp;", "&")
        }
        if (string.includes("&lt;")) {
            string = string.replace("&lt;", "<")
        }
        if (string.includes("&gt;")) {
            string = string.replace("&gt;", ">")
        }
        if (string.includes("&quot;")) {
            string = string.replace("&quot;", '"')
        }
        if (string.includes("&#39;")) {
            string = string.replace("&#39;", "'")
        }
        return string
    },


    escape: function (string = '') {
        if (string.includes("&")) {
            string = string.replace("&", "&amp;")
        }
        if (string.includes("<")) {
            string = string.replace("<", "&lt;")
        }
        if (string.includes(">")) {
            string = string.replace(">", "&gt;")
        }
        if (string.includes('"')) {
            string = string.replace('"', "&quot;")
        }
        if (string.includes("'")) {
            string = string.replace("'", "&#39;")
        }
        return string
    },






}