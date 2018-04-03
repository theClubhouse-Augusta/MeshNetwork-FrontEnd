/**
 * Logs async errors to the server log files
 * @param {string} message 
 */
export default message => {
    fetch(`https://suggestify.io/api/log/${message}`)
}
