const { default: axios } = require("axios");
const { default: BigNumber } = require('bignumber.js');

function fetchPolls() {
    return axios.get('https://vote.makerdao.com/api/polling/all-polls')
        .then(resp => {
            return Promise.all(resp.data.polls.filter(isActivePoll).map(poll => {
                return fetchPollTally(poll)
                    .then(tally => {
                        return {
                            poll,
                            tally
                        }
                    })
            }))
        })
}

function getPollTallyUrl(poll) {
    return  `https://vote.makerdao.com/api/polling/tally/${poll.pollId}`
}

function fetchPollTally(poll) {
    const url = getPollTallyUrl(poll)
    return axios.get(url)
        .then(resp => {
            const tally =  resp.data
            const winningOptionMKR = new BigNumber(tally.options?.[tally?.winner]?.mkrSupport || 0)

            return {
                ...tally,
                winningOptionMKR
            }
        })
}



function isActivePoll(poll) {
    const now = Date.now();
    if (new Date(poll.endDate).getTime() < now) return false;
    if (new Date(poll.startDate).getTime() > now) return false;
    return true;
}



module.exports = {
    fetchPolls
}
