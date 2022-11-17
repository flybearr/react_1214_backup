import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Slider from './slider'
import Product_filter from './product_filter'
// import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import styled from '../../styles/product-scss/product.module.scss'
import img1 from './img/img1.jpg'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'

function Product() {
  //圖片
  const data = [
    {
      key: 1,
      src: img1,
    },
    {
      key: 2,
      src: img2,
    },
    {
      key: 3,
      src: img3,
    },
  ]
  // fixed_filter
  //附style給filter
  const [fixedd, setFixedd] = useState(false)
  //偵測是否為手機版面
  const [mob, setMob] = useState(false)
  const filterRef = useRef('')
  //偵測滾動時，filter要吸附的位置
  const scrollFilter = () => {
    const windowScrollY = window.scrollY
    let Window_W = window.innerWidth
    if (windowScrollY > 770 && Window_W > 500) {
      setFixedd(true)
    } else if (windowScrollY < 770 && Window_W > 500) {
      setFixedd(false)
    }
  }
  // 切換回product的方法 (讓Bar不要跑掉)
  // const filterLocation = () => {
  //   let Window_W = window.innerWidth
  //   if (location.pathname === '/product' && Window_W < 500) {
  //     setMob(true)
  //   } else {
  //     setMob(false)
  //   }
  // }

  // 視窗寬度方法
  const reSize = () => {
    let Window_W = window.innerWidth
    if (
      Window_W < 500 &&
      (location.pathname === '/product' || location.pathname === '/product/')
    ) {
      return setMob(true)
    } else if (Window_W > 500) {
      setMob(false)
    }
  }
  //抓取fetch狀態
  const [datas, setDatas] = useState([
    {
      product_sid: '1',
      product_name: 'a',
      product_category_sid: '10',
      brand_sid: '7',
      product_price: '3699',
      product_inventory: '20',
      product_img: '1',
      product_imgs: '1',
      product_spec: '1',
      product_feature: '1',
      size: 'S',
    },
  ])
  const { product_sid } = useParams()
  const location = useLocation()

  const [sid, getSid] = useState('')

  //Fetch所有產品
  const getProductData = async () => {
    const response = await axios.get('http://localhost:3001/product/all')
    const r = response.data
    // console.log(r)
    setDatas(r)
  }

  //-------------------------------------------------------------------
  useEffect(() => {
    getProductData()
    // filterLocation()
    // reSize()
    // window.addEventListener('resize', reSize)
    window.addEventListener('scroll', scrollFilter)
  }, [fixedd])

  return (
    <>
      <div className={styled.container}>
        <div className={styled.empty}></div>
        {/* Slider */}
        <Slider data={data} />

        {/* 搜尋專區 */}
        <div className={styled.form}>
          <form action="">
            <input className={styled.search} type="text" />

            <i className="fa-solid fa-magnifying-glass"></i>
          </form>

          {/* 種類專區 */}
        </div>
        <div className={styled.product_nav} Draggable onDrag={() => {}}>
          <div className={styled.product_nav_box1}>
            <Link>
              <h2>最新上架</h2>
            </Link>
            {mob ? <p>|</p> : ''}
            <Link>
              <h2>熱門商品</h2>
            </Link>
            {mob ? <p>|</p> : ''}
            <Link>
              <h2>男女服飾</h2>
            </Link>
            {mob ? <p>|</p> : ''}
          </div>
          <div className={styled.product_nav_box2}>
            <p>商品類別</p>
          </div>
          <div className={styled.product_nav_box3}>
            <Link>
              <h2>專業用品</h2>
            </Link>
            {mob ? <p>|</p> : ''}
            <Link>
              <h2>飲水用品</h2>
            </Link>
            {mob ? <p>|</p> : ''}
            <Link>
              <h2>其他配件</h2>
            </Link>
          </div>
        </div>

        {/* 卡片專區 */}

        {/* <div className={styled.cardBigBox}> */}
        <Product_filter
          fixedd={fixedd}
          mob={mob}
          setMob={setMob}
          reSize={reSize}
          filterRef={filterRef}
        />
        <div className={styled.cardbox}>
          {datas.map((v, i) => {
            return (
              <Link
                className={styled.card}
                key={v.product_sid}
                to={'/product/' + v.product_sid}
              >
                <div>
                  <img
                    src="https://cdn1.cybassets.com/media/W1siZiIsIjE2MTQyL3Byb2R1Y3RzLzM2MzA1MjQwLzE2NjM5MDE2NDZfODM4NGYzMjY3ODcxNmYwOGQ3YTUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=0c0e2037acddca29"
                    alt=""
                  />
                  <p className={styled.p}>{v.product_name}</p>
                  <h2>
                    金額：<span>${v.product_price}</span>
                  </h2>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Product
