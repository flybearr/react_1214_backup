import { useState, useContext } from 'react'
import ProCartContext from '../../../../contexts/ProCartContext'
import styled from '../../../../styles/cart-scss/cartDetail.module.scss'
function CartDetailPro() {
  // pro:[{
  //  sid: 50,
  //  name: "+9拐杖",
  //  size: "S",
  //  price: 2000,
  //  qty: 1
  // }]
  const { pro, plusOne, minusOne, delOne, moneyFormat } =
    useContext(ProCartContext)
  const [del, setDel] = useState([])
  const change = (el, i) => {
    if (!del.includes(el.sid)) {
      const newDel = [...del, el.sid]
      setDel(newDel)
    }
  }
  return (
    <>
      {pro && (
        <div className={`${styled.dtWrap} ${styled.pro}`}>
          <div className={styled.outWrap}>
            {pro.map((el, i) => {
              return (
                <div
                  className={
                    del.includes(el.sid)
                      ? `${styled.wrapChange}`
                      : `${styled.wrap}`
                  }
                  key={`${el.sid}+${el.size}`}
                >
                  <input type="checkbox" />
                  <div className={styled.wrapRight}>
                    <div className={styled.roomText}>
                      <h2>{el.name}</h2>
                      <p>尺寸：{el.size}</p>
                      <p>單價：{moneyFormat(el.price)}</p>
                      <div className={styled.people}>
                        <p>數量：</p>
                        <div className={styled.qty}>
                          {el.qty <= 1 ? (
                            <button
                              onClick={() => {
                                minusOne(el.sid, el.size, el.price)
                              }}
                              disabled
                            >
                              －
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                minusOne(el.sid, el.size, el.price)
                              }}
                            >
                              －
                            </button>
                          )}
                          <button>{el.qty}</button>
                          <button
                            onClick={() => {
                              plusOne(el.sid, el.size, el.price)
                            }}
                          >
                            ＋
                          </button>
                        </div>
                      </div>
                      <p>總金額：{moneyFormat(el.price * el.qty)}</p>
                    </div>
                    <div className={styled.roomImg}>
                      <img
                        src="https://cdn2.ettoday.net/images/4778/d4778980.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      const t = el.qty * el.price
                      change(el, i)
                      setTimeout(() => {
                        delOne(el.sid, el.size, t)
                      }, 500)
                    }}
                  ></i>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default CartDetailPro