
// 리턴의 형태는 {success: true/false, result: }

module.exports.ResError = function(err) {

    let result = {success: false};

    if (typeof err === 'object' && typeof err.message !== 'undefined'){

        result = {...result, result: [err.toString()]};
    }

    return result;
};



module.exports.ResSuccess = function(result){

    let val = {success: true};

    if (typeof result === 'object'){

        val = {...val, result: result.data, count: result.count};
    }
    return val;
};