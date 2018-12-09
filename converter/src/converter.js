const DataTypes = {
    EVENT: 'event',
    MARKET: 'market',
    OUTCOME: 'outcome',
}

const parse = data => data.toString().split(/\n/).map(x => x.split(/(?<!\\)\|/).slice(1));

const convertEvent = function convertEvent(data) {
    let [eventId, category, subCategory, name, startTime, displayed, suspended] = data;
    name = name.replace(/\\\\/g);
    return { eventId, category, subCategory, name, startTime, displayed, suspended };
}

const convertMarket = function convertMarket(data) {
    const [eventId, marketId, name, displayed, suspended] = data;
    return { eventId, marketId, name, displayed, suspended };
}

const convertOutcome = function convertOutcome(data) {
    const [marketId, outcomeId, name, price, displayed, suspended] = data;
    return { marketId, outcomeId, name, price, displayed, suspended };
}

const convert = function convert(data) {
    return parse(data)
        .map((row) => {
            const [msgId, operation, type, timestamp, ...body] = row;
            if (!msgId) return null;
            let convertedBody;
            switch (type) {
                case DataTypes.EVENT:
                    convertedBody = convertEvent(body);
                    break;
                case DataTypes.MARKET:
                    convertedBody = convertMarket(body);
                    break;
                case DataTypes.EVENT:
                    convertedBody = convertOutcome(body);
                    break;
                default:
                    return null;
            }
            return { msgId, operation, type, timestamp, ...convertedBody };
        })
        .filter(Boolean);
}

module.exports = { convert };
