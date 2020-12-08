var heshaxpy = {
    chunk: function(array, size=1) {
        var result = []
        var arr = []
        var l = 0

        if (size < 1) {
            size = 1
        }

        for (var i = 0; i < array.length; i++) {
            arr.push(array[i])
            l++
            if (l == size) {
                result.push(arr)
                arr = []
                l = 0
            }
        }
        if (l != 0 ) {
            result.push(arr)
        }
        return result
    }
}