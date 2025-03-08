export const success = (body) => {
    return {
        success: true,
        statusCode: 200,
        body
    }
}

export const notFound = (body) => {
    return {
        success: false,
        statusCode: 400,
        body
    }
}

export const serverError = (error) => {
    return {
        success: false,
        statusCode: 500,
        body: error.message
    }
}