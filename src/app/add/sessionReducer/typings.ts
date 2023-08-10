import { DateRange } from 'react-day-picker'

type State = {
    step: number
    title: string
    date: DateRange | undefined
    preview_image: string
    simple_description: string
    detailed_description: string
    carousel_images: string
    alt?: string
    root_folder?: string
}

type Action =
    | { type: 'continue-step' }
    | { type: 'previous-step' }
    | { type: 'set-title'; payload: string }
    | { type: 'set-date'; payload: DateRange | undefined }
    | { type: 'set-preview-image'; payload: string }
    | { type: 'set-simple-description'; payload: string }
    | { type: 'set-detailed-description'; payload: string }
    | { type: 'set-carousel-images'; payload: string }
    | { type: 'set-alt'; payload: string }
    | { type: 'set-root-folder'; payload: string }

export type { State, Action }
