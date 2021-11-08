const { default: axios } = require("axios");
const { default: BigNumber } = require("bignumber.js");

function fetchPolls() {
    return axios.get('https://vote.makerdao.com/api/polling/all-polls')
        .then(resp => {
            return Promise.all(resp.data.filter(isActivePoll).map(poll => {
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
    return !isActivePoll(poll)
        ? `https://vote.makerdao.com/api/polling/tally/cache-no-revalidate/${poll.pollId}?network=mainnet&type=${poll.voteType}`
        : `https://vote.makerdao.com/api/polling/tally/${poll.pollId}?network=mainnet&type=${poll.voteType}`;
}

function fetchPollTally(poll) {
    const url = getPollTallyUrl(poll)
    return axios.get(url)
        .then(resp => {
            return parseRawPollTally(resp.data, poll)
        })
}


function parseRawPollTally(rawTally, poll) {
    const totalMkrParticipation = new BigNumber(rawTally.totalMkrParticipation);

    const winningOptionName = rawTally?.winner === null ? 'None found' : poll.options[rawTally.winner];

    const rankedChoiceResult = Object.keys(poll.options)
        .map(key => {
            return {
                optionId: key,
                optionName: poll.options[key],
                firstChoice: new BigNumber(rawTally.options?.[key]?.firstChoice || 0),
                transfer: new BigNumber(rawTally.options?.[key]?.transfer || 0),
                firstPct: rawTally.options?.[key]?.firstChoice
                    ? new BigNumber(rawTally.options[key].firstChoice)
                        .div(totalMkrParticipation)
                        .times(100)
                    : new BigNumber(0),
                transferPct: rawTally.options?.[key]?.transfer
                    ? new BigNumber(rawTally.options[key].transfer).div(totalMkrParticipation).times(100)
                    : new BigNumber(0),
                eliminated: rawTally.options?.[key]?.eliminated ?? true,
                winner: rawTally.options?.[key]?.winner ?? false
            };
        })
        .sort((a, b) => {
            const valueA = a.firstChoice.plus(a.transfer);
            const valueB = b.firstChoice.plus(b.transfer);
            if (valueA.eq(valueB)) return a.optionName > b.optionName ? 1 : -1;
            return valueA.gt(valueB) ? -1 : 1;
        });

    const pluralityResult = Object.keys(poll.options)
        .map(key => {
            return {
                optionId: key,
                optionName: poll.options[key],
                mkrSupport: new BigNumber(rawTally.options?.[key]?.mkrSupport || 0),
                firstPct: rawTally.options?.[key]?.mkrSupport
                    ? new BigNumber(rawTally.options[key].mkrSupport)
                        .div(totalMkrParticipation)
                        .times(100)
                    : new BigNumber(0),
                winner: rawTally.options?.[key]?.winner ?? false
            };
        })
        .sort((a, b) => {
            const valueA = a.mkrSupport;
            const valueB = b.mkrSupport;
            if (valueA.eq(valueB)) return a.optionName > b.optionName ? 1 : -1;
            return valueA.gt(valueB) ? -1 : 1;
        });

    return {
        ...rawTally,
        results: poll.voteType === POLL_VOTE_TYPE.PLURALITY_VOTE ? pluralityResult : rankedChoiceResult,
        totalMkrParticipation,
        winningOptionName
    };
}

const POLL_VOTE_TYPE = {
    PLURALITY_VOTE: 'Plurality Voting',
    RANKED_VOTE: 'Ranked Choice IRV',
    UNKNOWN: 'Unknown'
};

function isActivePoll(poll) {
    const now = Date.now();
    if (new Date(poll.endDate).getTime() < now) return false;
    if (new Date(poll.startDate).getTime() > now) return false;
    return true;
}



module.exports = {
    fetchPolls
}