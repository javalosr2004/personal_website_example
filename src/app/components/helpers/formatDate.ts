import dayjs from 'dayjs'

const formatDate = (start_date: string, end_date: string) => {
    const format_start = dayjs(start_date).format('MMM YYYY')
    if (end_date != '') {
        const format_end = dayjs(end_date).format('MMM YYYY')
        return format_start + ' - ' + format_end
    }
    return format_start + ' - Present'
}

export { formatDate }
