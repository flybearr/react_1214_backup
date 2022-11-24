import styled from '../../styles/order-scss/Order.module.scss'
import { MY_HOST } from './myConfig'
import MemberContext from '../../contexts/MemberContext'
import OrderTime from './components/OrderTime'
import OrderNum from './components/OrderNum'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
function Order() {
  const { data, auth } = useContext(MemberContext)
  //打開子訂單+時間線增長的狀態
  const [open, setOpen] = useState([])
  const [momOrder, setMomOrder] = useState([
    {
      rows: [],
      proRows: [],
      roomRows: [],
      renRows: [],
      camRows: [],
    },
  ])
  const getList = async () => {
    const sid = data.member_sid
    const res = await axios.get(MY_HOST + `/order/api?sid=${sid}`)
    setMomOrder(res.data)
  }
  useEffect(() => {
    console.log(456)
    getList()
  }, [auth])
  return (
    <div className={styled.orderRight}>
      <div className={styled.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="可以透過訂單編號、商品名稱搜尋" />
      </div>
      <div className={styled.orderBottom}>
        <OrderTime momOrder={momOrder} open={open} />
        <OrderNum momOrder={momOrder} open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Order
