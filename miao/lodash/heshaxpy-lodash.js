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
            s +=  separator + array[i]     //最新的结果 字符串加上等于操作符+数组元素
        }
        return s
    },



    last: function(array) {
        return array[array.length - 1]
    },



    lastIndexOf: function(array, value, fromIndex=array.length-1) {

        for (var i = fromIndex; i >= 0; i--) {    //直接从给定起始点开始返回索引
            if (array[i] == value){
                return i
            }
        }
        return i
    }



}