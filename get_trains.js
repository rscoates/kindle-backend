const axios = require('axios');

const SAINT_JOHNS = 'SAJ';
const CANNON_ST = 'CST';
const DIRECT_JOURNEY_MAX = 20;
const TIME_NOW = new Date();
const TIME_TO_STATION_MINUTES = 10;
const TIME_TO_STATION = TIME_TO_STATION_MINUTES * 60 * 1000;
const ON_TIME = 'On time';

const source = SAINT_JOHNS
const destination = CANNON_ST
const url = `https://departureboard-io-api-mj7fisk44q-nw.a.run.app/api/v1.0/getFormattedJourneyByCRS?sourceCRS=${source}&destCRS=${destination}`

const getTrains = () => axios.get(url).then((response) => {
  const data = response.data.data
  return filteredData = data.filter((row) => {
    const departureTime = new Date()
    const [hours, minutes] = row['departureDue'] === ON_TIME ? row['departureScheduled'].split(':') : row['departureDue']
    departureTime.setHours(+hours)
    departureTime.setMinutes(+minutes)
    const duration = parseInt(row['duration'])
    return departureTime.valueOf() - TIME_NOW.valueOf() > TIME_TO_STATION && duration < DIRECT_JOURNEY_MAX
}).filter((_, idx) => idx < 4).map((row) => {
    const {
        arrivalDue, arrivalScheduled,
        departureDue, departureScheduled
    } = row
    return {arrivalDue, arrivalScheduled, departureDue, departureScheduled}
})
})

module.exports = getTrains