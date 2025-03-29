const timezones = [
    { id: 1, label: "UTC", value: "UTC", offset: 0, offsetStr: "UTC+00:00" },
    { id: 2, label: "Pacific Standard Time", value: "America/Los_Angeles", offset: -480, offsetStr: "UTC-08:00" },
    { id: 3, label: "Mountain Standard Time", value: "America/Denver", offset: -420, offsetStr: "UTC-07:00" },
    { id: 4, label: "Central Standard Time", value: "America/Chicago", offset: -360, offsetStr: "UTC-06:00" },
    { id: 5, label: "Eastern Standard Time", value: "America/New_York", offset: -300, offsetStr: "UTC-05:00" },
    { id: 6, label: "Greenwich Mean Time", value: "Europe/London", offset: 0, offsetStr: "UTC+00:00" },
    { id: 7, label: "Central European Time", value: "Europe/Berlin", offset: 60, offsetStr: "UTC+01:00" },
    { id: 8, label: "Eastern European Time", value: "Europe/Kyiv", offset: 120, offsetStr: "UTC+02:00" },
    { id: 9, label: "Moscow Standard Time", value: "Europe/Moscow", offset: 180, offsetStr: "UTC+03:00" },
    { id: 10, label: "Indian Standard Time", value: "Asia/Kolkata", offset: 330, offsetStr: "UTC+05:30" },
    { id: 11, label: "China Standard Time", value: "Asia/Shanghai", offset: 480, offsetStr: "UTC+08:00" },
    { id: 12, label: "Japan Standard Time", value: "Asia/Tokyo", offset: 540, offsetStr: "UTC+09:00" },
    { id: 13, label: "Australian Eastern Standard Time", value: "Australia/Sydney", offset: 600, offsetStr: "UTC+10:00" },
    { id: 14, label: "Brasilia Time", value: "America/Sao_Paulo", offset: -180, offsetStr: "UTC-03:00" },
    { id: 15, label: "Argentina Time", value: "America/Argentina/Buenos_Aires", offset: -180, offsetStr: "UTC-03:00" },
    { id: 16, label: "South Africa Standard Time", value: "Africa/Johannesburg", offset: 120, offsetStr: "UTC+02:00" },
    { id: 17, label: "New Zealand Standard Time", value: "Pacific/Auckland", offset: 720, offsetStr: "UTC+12:00" },
    { id: 18, label: "Hawaii-Aleutian Standard Time", value: "Pacific/Honolulu", offset: -600, offsetStr: "UTC-10:00" },
    { id: 19, label: "Alaska Standard Time", value: "America/Anchorage", offset: -540, offsetStr: "UTC-09:00" },
    { id: 20, label: "Central Africa Time", value: "Africa/Lagos", offset: 60, offsetStr: "UTC+01:00" },
    { id: 21, label: "Hong Kong Time", value: "Asia/Hong_Kong", offset: 480, offsetStr: "UTC+08:00" },
    { id: 22, label: "Singapore Time", value: "Asia/Singapore", offset: 480, offsetStr: "UTC+08:00" },
    { id: 23, label: "Korea Standard Time", value: "Asia/Seoul", offset: 540, offsetStr: "UTC+09:00" },
    { id: 24, label: "Bangladesh Standard Time", value: "Asia/Dhaka", offset: 360, offsetStr: "UTC+06:00" },
    { id: 25, label: "Pakistan Standard Time", value: "Asia/Karachi", offset: 300, offsetStr: "UTC+05:00" },
    { id: 26, label: "Arabian Standard Time", value: "Asia/Riyadh", offset: 180, offsetStr: "UTC+03:00" },
    { id: 27, label: "Iran Standard Time", value: "Asia/Tehran", offset: 210, offsetStr: "UTC+03:30" },
    { id: 28, label: "Philippine Time", value: "Asia/Manila", offset: 480, offsetStr: "UTC+08:00" },
    { id: 29, label: "Western Indonesian Time", value: "Asia/Jakarta", offset: 420, offsetStr: "UTC+07:00" },
    { id: 30, label: "Atlantic Standard Time", value: "America/Halifax", offset: -240, offsetStr: "UTC-04:00" }
];

export const timezonesEnum = timezones.map(t => t.id)

const getTimezoneById = (id: number) => {
    return timezones.find((tz) => tz.id === id) || null;
};

const convertTimestampToTimezone = (id: number, timestamp: number) => {
    const tz = getTimezoneById(id);
    if (!tz) return null;

    const date = new Date(timestamp);
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000; // Convert to UTC
    const localTime = utcTime + tz.offset * 60000; // Apply offset

    return new Date(localTime);
};

const getCurrentTimeInTimezone = (id: number) => {
    return convertTimestampToTimezone(id, Date.now());
};

const listAllTimezones = () => {
    return timezones.map((tz) => ({
        id: tz.id,
        label: tz.label,
        value: tz.value,
        offsetStr: tz.offsetStr,
    }));
};

export { timezones, getTimezoneById, convertTimestampToTimezone, getCurrentTimeInTimezone, listAllTimezones };
