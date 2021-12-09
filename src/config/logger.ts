
const getTime = (): string => {
    const dateObject = new Date();
    const date = dateObject.getDate();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[dateObject.getDay()];
    const hour = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const minute = minutes.toLocaleString().length < 2 ? `0${minutes}` : minutes;


    return `${hour}:${minute} at ${day}, ${date}`;
}

const info = <T>(namespace: string, message: string, object?: T) => {
    if (object) return console.info(`[${namespace}] - [INFO]: ${message}`, object);
    return console.info(`[${getTime()}] [${namespace}] - [INFO]: ${message}`);
}

const error = <T>(namespace: string, message: string, object?: T) => {
    if (object) return console.error(`[${namespace}] - [ERROR]: ${message}`, object);
    return console.error(`[${getTime()}] [${namespace}] - [ERROR]: ${message}`);
}

export default { info, error };