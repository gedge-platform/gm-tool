const stepConverter = (time) => {
    if (time < 1) {
        return time * 60 + "s";
    } else if (time < 60) {
        return time + "m";
    } else {
        return time / 60 + "h";
    }
};

// realtime => 5s

const unixCurrentTime = () => Math.ceil(new Date().getTime() / 1000);
const unixStartTime = (interval) =>
    // interval : (10m) -> 10 * 60s, (1h) -> 60 * 60s
    Math.ceil(unixCurrentTime() - interval * 60);

export { stepConverter, unixCurrentTime, unixStartTime };
