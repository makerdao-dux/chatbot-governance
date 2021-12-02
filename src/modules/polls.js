const { default: axios } = require("axios");

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
            return resp.data
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