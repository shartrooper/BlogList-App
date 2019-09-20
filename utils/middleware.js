const morgan = require('morgan');

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
morgan.token('body', function getBody(req) {
    return req.method === 'POST' ? JSON.stringify(req.body) : 'none';
})
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}