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
    }
}