export function convertToHoursAndMinutes(value: string) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);

    return convertNumberToTimeFormat(hours) + ':' + convertNumberToTimeFormat(minutes)
}

function convertNumberToTimeFormat(value: number) {
    return value < 10 ? "0" + value : value
}
