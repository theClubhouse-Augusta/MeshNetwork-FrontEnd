/**
 * Logs async errors to the server log files
 * @param {string} message 
 */
export default message => {
    fetch(`https://testbean2-env.us-east-1.elasticbeanstalk.com/api/log/${message}`)
}
