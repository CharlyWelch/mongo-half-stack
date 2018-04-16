module.exports = (req, res) => {
    res.statusCode = 404;
    res.end({
        error: true,
        message: `Cannot ${req.method} ${req.url}`
    });
};