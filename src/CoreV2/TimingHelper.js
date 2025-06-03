


export default class TimingHelper {
    static DateToMins(date) {
        return (+date) / (60 * 1000);
    }
    static MinsToDate(mins) {
        return new Date(mins * 60 * 1000);
    }
}