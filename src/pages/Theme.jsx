import { useDispatch, useSelector } from "react-redux"
import { changeTheme } from "../redux/theme/theme.slice"
import { useEffect } from "react"

const Theme = () => {
    const mode = useSelector(state => state.theme.mode)
    const dispatch = useDispatch()

    useEffect(() => {
        const html = document.documentElement
        if (mode === 'dark') {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }, [mode])

    return (
        <div
            className={`min-h-screen flex items-center justify-center transition p-6 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
                }`}
        >
            <button
                onClick={() => dispatch(changeTheme())}
                className={`text-2xl px-6 py-4 rounded-xl font-semibold shadow-md transition duration-300 ${mode === 'dark'
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
            >
                Toggle {mode === 'light' ? '🌙' : '☀️'}
            </button>
        </div>


    )
}

export default Theme