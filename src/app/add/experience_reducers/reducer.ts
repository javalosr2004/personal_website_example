import { State, Action } from './typings'

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'previous-step':
            if (state.step - 1 >= 0) {
                return { ...state, step: state.step - 1 }
            } else {
                return state
            }
        case 'continue-step':
            if (state.step + 1 < 2) {
                return { ...state, step: state.step + 1 }
            } else {
                return state
            }
        case 'set-title':
            return { ...state, title: action.payload }
        case 'set-date':
            return { ...state, date: action.payload }
        case 'set-preview-image':
            return { ...state, preview_image: action.payload }
        case 'set-simple-description':
            return { ...state, simple_description: action.payload }
        case 'set-detailed-description':
            return { ...state, detailed_description: action.payload }
        case 'set-carousel-images':
            return { ...state, carousel_images: action.payload }
        case 'set-alt':
            return { ...state, alt: action.payload }
        case 'set-root-folder':
            return { ...state, root_folder: action.payload }

        default:
            return state
    }
}

export default reducer
