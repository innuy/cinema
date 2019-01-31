module.exports.isFunction = (v) => {
    if (v instanceof Function) {
        return true;
    }
    return false;
};