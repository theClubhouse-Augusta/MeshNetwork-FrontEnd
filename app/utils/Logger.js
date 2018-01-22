 /**
  * Logs async errors to the server log files
  * @param {string} message 
  */
export default message => {
  fetch(`http://localhost:8000/api/log/${message}`)
}
