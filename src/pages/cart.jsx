import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeItem, updateQuantity, addItem } from '../redux/cart/cart.slice'

export default function Cart() {
    const dispatch = useDispatch()
    const { cartItems, totalQuantity, totalAmount, isSuccess } = useSelector(state => state.cart)

    const [showModal, setShowModal] = useState(false)
    const [newItem, setNewItem] = useState({ name: '', price: '' })

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const handleAddItem = (e) => {
        e.preventDefault()
        const item = {
            name: newItem.name,
            price: parseFloat(newItem.price),
        }
        dispatch(addItem(item))
        setNewItem({ name: '', price: '' })
        setShowModal(false)
    }

    if (!isSuccess) return <p>Loading...</p>

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🛒 Shopping Cart</h2>

            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                ➕ Thêm sản phẩm
            </button>

            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border p-4 rounded mb-4">
                    <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p>${item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                                dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                            }
                            className="w-16 text-center border rounded"
                        />
                        <button
                            onClick={() => dispatch(removeItem(item.id))}
                            className="text-red-600 hover:text-red-800 font-bold"
                        >
                            ❌
                        </button>
                    </div>
                </div>
            ))}

            <div className="mt-6 border-t pt-4 text-right">
                <p className="font-semibold">Tổng số lượng: {totalQuantity}</p>
                <p className="font-bold text-xl">Tổng tiền: ${totalAmount.toFixed(2)}</p>
            </div>

            {/* Modal thêm sản phẩm */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-80">
                        <h3 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h3>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block font-medium">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Giá</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1 border rounded"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
