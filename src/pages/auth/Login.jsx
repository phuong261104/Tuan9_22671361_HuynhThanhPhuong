import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/auth.slice'

export default function Login() {
    const dispatch = useDispatch()
    const { isLoading, error } = useSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ username, password }))
    }

    return (
        <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">🔐 Đăng nhập</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
            </form>
        </div>
    )
}
