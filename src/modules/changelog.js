const { default: axios } = require("axios");

function fetchChangelog() {
    return axios.get('https://changelog.makerdao.com/releases/mainnet/1.9.9/contracts.json')
        .then(resp => {
            return resp.data.CHANGELOG
        })
}



module.exports = {
    fetchChangelog
}