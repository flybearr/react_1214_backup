import { useState, useContext } from 'react'
import ProCartContext from '../../../contexts/ProCartContext'
import styled from '../../../styles/cart-scss/BuyCart.module.scss'
function BuyCart({ step, setStep, buyBar }) {
  const { cartItem, resetCart } = useContext(ProCartContext)
  const [check, setCheck] = useState(false)
  if (step === 1) {
    return (
      <>
        <div
          className={styled.buyCart}
          style={{ position: buyBar && 'absolute' }}
        >
          <div className={styled.wrap}>
            <div>
              <input
                type="checkbox"
                id="check"
                checked={check}
                onChange={(e) => {
                  setCheck(e.target.checked)
                }}
              />
              <label htmlFor="check">全選</label>
            </div>
            <p>總訂購數量：{cartItem ? cartItem : 0}</p>
            <div className={styled.price}>
              <span>總金額：</span>
              <p>$19000</p>
            </div>
            <button onClick={resetCart}>清空購物車</button>
            <button
              onClick={() => {
                setStep(step + 1)
              }}
            >
              買單去
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default BuyCart
