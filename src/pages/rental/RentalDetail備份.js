import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from '../../styles/rental-scss/rentalDetail.module.scss'
import Commnent from './components/Commnent'

const Rental_detail = () => {
  const testData = [0, 1, 2, 3, 4, 5]
  const { rental_product_sid } = useParams()
  let [Detail, setDetail] = useState({})

  const rental_url = `http://localhost:3001/rental/getDetailData/${rental_product_sid}`

  async function get_rental_detail() {
    const response = await axios.get(rental_url)
    console.log(response.data.rows[0])
    setDetail(response.data.rows[0])
  }

  useEffect(() => {
    get_rental_detail()
  }, [])
  return (
    <>
      <div className={styled.empty}></div>

      <div className={styled.container}>
        <div className={styled.section1}>
          <div className={styled.left}>
            <div className={styled.imgmain}>
              <img
                src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                alt=""
              />
            </div>
            <div className={styled.smallpic}>
              <div>
                <img
                  src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={styled.right}>
            <h2>商品名稱：</h2>
            <p>每日租金：</p>
            <div className={styled.flex}>
              <div>
                <span>租借起始日：</span>
                <select name="" id="">
                  <option value="">請選擇</option>
                  <option value="">請選擇一</option>
                </select>
              </div>
              <div>
                <span>租借歸還日：</span>
                <select name="" id="">
                  <option value="">請選擇</option>
                  <option value="">請選擇一</option>
                </select>
              </div>
            </div>
            <div className={styled.flex}>
              <div>
                <span>取件店點：</span>
                <select name="" id="">
                  <option value="">請選擇</option>
                  <option value="">請選擇一</option>
                </select>
              </div>
              <div>
                <span>歸還店點：</span>
                <select name="" id="">
                  <option value="">請選擇</option>
                  <option value="">請選擇一</option>
                </select>
              </div>
            </div>
            <div className={styled.flex}>
              <div>租借費用:＄1200</div> <div>跨店費用:＄1200</div>
            </div>
            <div className={styled.flex}>
              <div>
                <span>商品數量：</span>
                <button>-</button>
                <button className={styled.middlebutton}>1</button>
                <button>＋</button>
              </div>

              <span>總金額：</span>
            </div>
            <button className={styled.addcart}>加入購物車</button>
          </div>
        </div>

        <div className={styled.section2}>
          <h2>商品介紹</h2>
          <h2>商品評論</h2>
        </div>

        {/* <div className={styled.section3}>
          <div>
            <h3>商品規格</h3>
            <p>
              規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格
            </p>
          </div>
          <div>
            <h3>特色說明</h3>
            <p>
              規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格規格
            </p>
          </div>
        </div> */}

        <div className={styled.sectionCommnent}>
          <div className={styled.star}>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div className={styled.commnentCardBox}>
            {/* <div className={styled.commentCard}>
              <div className={styled.memberInfo}>
                <div className={styled.avatar}>
                  <img
                    src="https://qoopio.com/wp-content/uploads/2020/06/%E9%99%B3%E6%80%A1%E5%90%9Bmini_%E8%AD%89%E4%BB%B6%E7%85%A7.jpg"
                    alt=""
                  />
                </div>
                <p>May</p>
              </div>
              <p className={styled.commnentWord}>
                這次活動真的好好玩喔 我下次還想去
              </p>
              <div className={styled.star}>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p className={styled.readMore}>閱讀更多</p>
            </div> */}
            {testData.map(() => {
              return <Commnent />
            })}
          </div>
        </div>

        {/* section444444444 */}
        <div className={styled.section4}>
          <h3>猜你喜歡</h3>
          <div className={styled.cardbox}>
            <div className={styled.card}>
              <div className={styled.imgwrap}>
                <img
                  src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                  alt=""
                />
              </div>
              <p>nike長毛象經典登山鞋好好看喔大家快來買</p>
              <p>金額：3,960</p>
            </div>
            <div className={styled.card}>
              <div className={styled.imgwrap}>
                <img
                  src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                  alt=""
                />
              </div>
              <p>nike長毛象經典登山鞋好好看喔大家快來買</p>
              <p>金額：3,960</p>
            </div>
            <div className={styled.card}>
              <div className={styled.imgwrap}>
                <img
                  src="http://localhost:3001/imgs/rental/b1aaf36de607b30fbe5cc07515339236.jpg"
                  alt=""
                />
              </div>
              <p>nike長毛象經典登山鞋好好看喔大家快來買</p>
              <p>金額：3,960</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rental_detail
