const { default: axios } = require("axios");

function fetchChangelog(key) {
    console.log('Fetching changelog for ', key);

    return axios.get('https://changelog.makerdao.com/releases/mainnet/active/contracts.json')
        .then(resp => {
            return resp.data[key] || 'Invalid changelog key, please, try using things like: ' + Object.keys(resp.data).slice(0, 4).join(', ') + '... \n Or check at https://changelog.makerdao.com/releases/mainnet/1.9.9/contracts.json '
        })
}



module.exports = {
    fetchChangelog
}