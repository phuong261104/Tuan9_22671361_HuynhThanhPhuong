import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/auth.slice'

export default function Welcome() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">👋 Chào mừng, {user.name}!</h2>
            <button
                onClick={() => dispatch(logout())}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Đăng xuất
            </button>
        </div>
    )
}
