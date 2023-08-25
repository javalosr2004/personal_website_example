type FetchArgs = [input: RequestInfo, init?: RequestInit]

const fetcher = (...args: FetchArgs) => fetch(...args).then((res) => res.json())

export default fetcher
