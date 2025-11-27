export function getTimeOfDay() {
    let message = ''
    const date = new Date()
    const hour = date.getHours()
    if (hour >= 6 && hour < 9) {
        message = '早上好'
    } else if (hour >= 9 && hour < 12) {
        message = '上午好'
    } else if (hour >= 12 && hour < 18) {
        message = '下午好'

    } else {
        message = '晚上好'
    }
    return message
}