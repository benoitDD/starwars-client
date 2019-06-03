/* eslint-disable indent */
/* eslint-disable no-undef */
module.exports = {
    client: {
        includes: ['./client/query/*'],
        service: {
            name: 'starwars-api',
            localSchemaFile: './starwars.json'
        }
    }
}