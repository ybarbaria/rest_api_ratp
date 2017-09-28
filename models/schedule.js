exports.Mission = class {
    constructor(stationsMessages, stationsDates, stationsStops, stationsPlatforms) {
        this.stationsMessages = stationsMessages;
        this.stationsDates = stationsDates;
        this.stationsStops = stationsStops;
        this.stationsPlatforms = stationsPlatforms;
    }
};

module.exports = Mission;