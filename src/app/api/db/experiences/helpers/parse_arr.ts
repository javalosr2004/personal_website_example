export function parse_string_to_arr(str: string | undefined): string[] {
    let arr = []
    if (str && str.length > 1) {
        arr = JSON.parse(str.replace(/'/g, '"'))
    }
    return arr
}
