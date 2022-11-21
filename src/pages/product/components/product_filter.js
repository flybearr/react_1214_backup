import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from '../../../styles/product-scss/product.module.scss'

export default function ProductFilter({
  fixedd,
  mob,
  setMob,
  filterRef,
  setFromFilterDataCard,
  setFromFilterDataGender,
  datas,
  setDatas,
}) {
  const mobile = useMediaQuery({ query: '(max-width:390px)' })
  // const [genderFilter, setGenderFilter] = useState([{}])
  const genderOptions = ['男', '女']
  const [proofList, setProofList] = useState([])
  const wProofOptions = [
    '抗水（Water Resistant）',
    '防潑水（Water Repellent）',
    '防水（Waterproof）',
  ]
  const [genders, setGenders] = useState('')
  const [filters, setFilter] = useState({
    lowPrice: '',
    highPrice: '',
    brand: '',
    gender: '1',
    wProof: '1',
  })
  // 輸入時抓到value
  const handleFieldChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilter(newFilters)
  }
  //按下去後的做動
  const handleFormSubmit = (e) => {
    // 阻擋預設form送出的行為
    e.preventDefault()
    getData()
  }

  // const [lowPrice, setLowPrice] = useState('')
  // const [highPrice, setHighPrice] = useState('')
  // const [brand, setBrand] = useState('')
  const brandOptions = [
    { brand: 'Arcteryx 始祖鳥', id: 7 },
    { brand: 'nnnnnnn', id: 1 },
  ]

  const [filterOpen, setFilterOpen] = useState(false)

  // const [datas2, setDatas2] = useState([{}])

  const mbfilterRef = useRef('')

  // let allProduct = 'http://localhost:3001/product/all'
  // let price = 'http://localhost:3001/product/price'
  // let brands = 'http://localhost:3001/product/brand'
  // let price_brand = 'http://localhost:3001/product/filter'

  // '抗水（Water Resistant）',
  //'防潑水（Water Repellent）',
  //'防水（Waterproof）',

  const filterRender = async (rotues) => {
    const response = await axios.post(rotues, {
      ...filters,
    })
    const data = response.data
    // 三種屬性 + 男
    if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防潑水（Water Repellent）') &&
      proofList.includes('防水（Waterproof）') &&
      genders === '男'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防潑水' || v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    // 三種屬性 + 女
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防潑水（Water Repellent）') &&
      proofList.includes('防水（Waterproof）') &&
      genders === '女'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防潑水' || v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(a)
      console.log(b)
      setDatas(b)
    }
    // 三種屬性
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防潑水（Water Repellent）') &&
      proofList.includes('防水（Waterproof）')
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防潑水' || v.proof === '防水'
      })
      console.log(a)
      console.log(a)
      setDatas(a)
    }
    // 抗水+防潑水+男
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防潑水（Water Repellent）') &&
      genders === '男'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防潑水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    // 防水+防潑水+男
    else if (
      proofList.includes('防潑水（Water Repellent）') &&
      proofList.includes('防水（Waterproof）') &&
      genders === '男'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '防潑水' || v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    // 抗水+防水+男
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防水（Waterproof）') &&
      genders === '男'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    //抗水+防潑水 +女
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防潑水（Water Repellent）') &&
      genders === '女'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防潑水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(b)
      setDatas(b)
    }
    //防潑水+防水 +女
    else if (
      proofList.includes('防潑水（Water Repellent）') &&
      proofList.includes('防水（Waterproof）') &&
      genders === '女'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '防潑水' || v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(b)
      setDatas(b)
    }
    //抗水+防水 +女
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防水（Waterproof）') &&
      genders === '女'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(b)
      setDatas(b)
    } //抗水+防潑水
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      proofList.includes('防潑水（Water Repellent）')
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防潑水'
      })
      console.log(a)
      setDatas(a)
    }
    //防水+防潑水
    else if (
      proofList.includes('防水（Waterproof）') &&
      proofList.includes('防潑水（Water Repellent）')
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '防水' || v.proof === '防潑水'
      })
      console.log(a)
      setDatas(a)
    }
    //防水+抗水
    else if (
      proofList.includes('防水（Waterproof）') &&
      proofList.includes('抗水（Water Resistant）')
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水' || v.proof === '防水'
      })
      console.log(a)
      setDatas(a)
    }
    //抗水 + 男
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      genders === '男'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    //防潑水 +男
    else if (
      proofList.includes('防潑水（Water Repellent）') &&
      genders === '男'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '防潑水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    //防水+男
    else if (proofList.includes('防水（Waterproof）') && genders === '男') {
      const a = data.filter((v, i) => {
        return v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 9 ||
          v.product_category_sid == 7 ||
          v.product_category_sid == 11
        )
      })
      console.log(b)
      setDatas(b)
    }
    //-------------------
    //抗水 + 女
    else if (
      proofList.includes('抗水（Water Resistant）') &&
      genders === '女'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(b)
      setDatas(b)
    }
    //防潑水 +女
    else if (
      proofList.includes('防潑水（Water Repellent）') &&
      genders === '女'
    ) {
      const a = data.filter((v, i) => {
        return v.proof === '防潑水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(b)
      setDatas(b)
    }
    //防水+女
    else if (proofList.includes('防水（Waterproof）') && genders === '女') {
      const a = data.filter((v, i) => {
        return v.proof === '防水'
      })
      const b = a.filter((v, i) => {
        return (
          v.product_category_sid == 8 ||
          v.product_category_sid == 10 ||
          v.product_category_sid == 12
        )
      })
      console.log(b)
      setDatas(b)
    }
    //--------------

    //抗水
    else if (proofList.includes('抗水（Water Resistant）')) {
      const a = data.filter((v, i) => {
        return v.proof === '抗水'
      })
      console.log(a)
      setDatas(a)
    }
    //防潑水
    else if (proofList.includes('防潑水（Water Repellent）')) {
      const a = data.filter((v, i) => {
        return v.proof === '防潑水'
      })
      console.log(a)
      setDatas(a)
    }
    //防水
    else if (proofList.includes('防水（Waterproof）')) {
      const a = data.filter((v, i) => {
        return v.proof === '防水'
      })
      console.log(a)
      setDatas(a)
    } else if (genders === '男') {
      const a = data.filter((v, i) => {
        return v.product_category_sid == 9
      })
      console.log(a)
      setDatas(a)
    } else if (genders === '女') {
      const a = data.filter((v, i) => {
        return v.product_category_sid == 10
      })
      console.log(a)
      setDatas(a)
    } else if (!genders) {
      setDatas(data)
      setFromFilterDataCard(datas)
      setFromFilterDataGender(genders)
    }

    // console.log(data)
  }

  let filter = 'http://localhost:3001/product/filter'
  // const getData = async () => {
  //   if (Number(filters.lowPrice) > Number(filters.highPrice)) {
  //     alert('請檢查價格是否輸入錯誤')
  //     console.log('請檢查價格是否輸入錯誤')
  //   } else if (genders) {
  //     filterRender(filter)
  //   } else if (filters.lowPrice && filters.highPrice && filters.brand) {
  //     filterRender(filter)
  //   } else if (
  //     (filters.lowPrice && filters.highPrice) ||
  //     (filters.lowPrice && filters.highPrice && filters.brand === -1)
  //   ) {
  //     filterRender(filter)
  //   } else if (filters.brand) {
  //     filterRender(filter)
  //   } else if (!filters.brand || !filters.lowPrice || !filters.highPrice) {
  //     // alert('請填資料')
  //     console.log('請填資料')
  //   }
  // }

  const getData = async () => {
    if (Number(filters.lowPrice) > Number(filters.highPrice)) {
      alert('請檢查價格是否輸入錯誤')
      console.log('請檢查價格是否輸入錯誤')
    } else if (
      filters.lowPrice ||
      filters.highPrice ||
      filters.brand ||
      genders ||
      proofList
    ) {
      filterRender(filter)
    } else if (
      !filters.brand ||
      !filters.lowPrice ||
      !filters.highPrice ||
      !genders ||
      !wProofOptions
    ) {
      // alert('請填資料')
      console.log('請填資料')
      alert('請填資料')
    }
  }

  //-----------------
  // const filterToggle
  const filterToggle = () => {
    if (!filterOpen) {
      mbfilterRef.current.style.height = '430px'
      mbfilterRef.current.style.backgroundColor = '#F5F5F5'
      setFilterOpen(true)
    } else {
      mbfilterRef.current.style.height = ''
      mbfilterRef.current.style.backgroundColor = ''
      setFilterOpen(false)
    }
  }

  // filter樣式 (電腦版)
  const webFilter = (
    <div className={fixedd ? `${styled.filter2}` : `${styled.filter}`}>
      {mob ? '' : ''}
      <form onSubmit={handleFormSubmit}>
        <h2>價格</h2>
        <div className={styled.pricebox}>
          <input
            size="5"
            type="text"
            placeholder="最低價格"
            name="lowPrice"
            value={filters.lowPrice}
            onChange={handleFieldChange}
          />
          <div className={styled.dash}></div>
          <div className="dash"></div>
          <input
            size="5"
            type="text"
            placeholder="最高價格"
            name="highPrice"
            value={filters.highPrice}
            onChange={handleFieldChange}
          />
        </div>
        <h2> 品牌</h2>
        <select
          name="brand"
          id=""
          value={filters.brand}
          onChange={handleFieldChange}
          className={styled.filterSelect}
        >
          <option value="">請選出廠牌</option>
          {brandOptions.map((v, i) => {
            return (
              <option key={i} value={v.id}>
                {v.brand}
              </option>
            )
          })}
        </select>
        <div className={styled.genderRadio}>
          {genderOptions.map((v, i) => {
            return (
              <div key={i} className={styled.genderBox}>
                <input
                  type="radio"
                  checked={genders === v}
                  name="gender"
                  value={v}
                  onChange={(e) => {
                    setGenders(e.target.value)
                  }}
                ></input>
                <label> {v}</label>
              </div>
            )
          })}
        </div>
        <h2> 防水等級</h2>
        {/* <div className={styled.checkBoxWrap}>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRes" value="wRes" name="wRes" />
            <label htmlFor="wRes">抗水（Water Resistant）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRep" value="wRep" name="wRep" />
            <label htmlFor="wRep">防潑水（Water Repellent）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wProof" value="wProof" name="proof" />
            <label htmlFor="wProof">防水（Waterproof）</label>
          </div>
        </div> */}
        <div className={styled.checkBoxWrap}>
          {wProofOptions.map((v, i) => {
            return (
              <div className={styled.checkBox} key={i}>
                <input
                  type="checkbox"
                  checked={proofList.includes(v)}
                  value={v}
                  id={i}
                  onChange={(e) => {
                    const value = e.target.value

                    if (proofList.includes(value)) {
                      // 如果此項目值在state陣列中 -> 移出state陣列
                      const newProofList = proofList.filter(
                        (v2, i2) => v2 !== value
                      )
                      setProofList(newProofList)
                    } else {
                      // 如果不在此state陣列中 -> 加到state陣列中
                      const newProofList = [...proofList, value]
                      setProofList(newProofList)
                    }
                  }}
                />
                <label htmlFor={i}>{v}</label>
              </div>
            )
          })}
        </div>
        <button type="submit" className={styled.filterButton}>
          送出
        </button>
        <hr />
        <div className={styled.star}>
          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i className="fa-solid fa-star"></i>
          </Link>
        </div>
      </form>
    </div>
  )

  //手機版面
  const mobFilter = (
    <div className={styled.mbfilter} ref={mbfilterRef}>
      <form action="" onSubmit={handleFormSubmit}>
        <div className={styled.filterTop}>
          <div className={styled.forms}>
            <form action="">
              <input className={styled.search} type="text" />

              <i className="fa-solid fa-magnifying-glass"></i>
            </form>
          </div>
          <div className={styled.icon}>
            <i className="fa-solid fa-sort"></i>
            <i
              className="fa-solid fa-filter"
              onClick={() => {
                filterToggle()
              }}
            ></i>
          </div>
        </div>
        <h2>價格</h2>
        <div className={styled.pricebox}>
          <input
            size="5"
            type="text"
            placeholder="最低價格"
            name="lowPrice"
            value={filters.lowPrice}
            onChange={handleFieldChange}
          />
          <div className={styled.dash}></div>
          <div className="dash"></div>
          <input
            size="5"
            type="text"
            placeholder="最高價格"
            name="highPrice"
            value={filters.highPrice}
            onChange={handleFieldChange}
          />
        </div>
        <h2> 品牌</h2>
        <select
          name="brand"
          id=""
          value={filters.brand}
          onChange={handleFieldChange}
          className={styled.filterSelect}
        >
          <option value="">請選出廠牌</option>
          {brandOptions.map((v, i) => {
            return (
              <option key={i} value={v.id}>
                {v.brand}
              </option>
            )
          })}
        </select>
        <div className={styled.genderRadio}>
          {genderOptions.map((v, i) => {
            return (
              <div key={i} className={styled.genderBox}>
                <input
                  type="radio"
                  checked={genders === v}
                  value={v}
                  name="gender"
                  onChange={(e) => {
                    setGenders(e.target.value)
                  }}
                ></input>
                <label> {v}</label>
              </div>
            )
          })}
        </div>
        <h2> 防水等級</h2>
        {/* <div className={styled.checkBoxWrap}>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRes" value="wRes" />
            <label htmlFor="wRes">抗水（Water Resistant）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRep" value="wRep" />
            <label htmlFor="wRep">防潑水（Water Repellent）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wProof" value="wProof" />
            <label htmlFor="wProof">防水（Waterproof）</label>
          </div>
        </div> */}
        <div className={styled.checkBoxWrap}>
          {wProofOptions.map((v, i) => {
            return (
              <div className={styled.checkBox} key={i}>
                <input
                  type="checkbox"
                  checked={proofList.includes(v)}
                  value={v}
                  id={i}
                  onChange={(e) => {
                    const value = e.target.value

                    if (proofList.includes(value)) {
                      // 如果此項目值在state陣列中 -> 移出state陣列
                      const newProofList = proofList.filter(
                        (v2, i2) => v2 !== value
                      )
                      setProofList(newProofList)
                    } else {
                      // 如果不在此state陣列中 -> 加到state陣列中
                      const newProofList = [...proofList, value]
                      setProofList(newProofList)
                    }
                  }}
                />
                <label htmlFor={i}>{v}</label>
              </div>
            )
          })}
        </div>

        <button
          type="submit"
          // onClick={(e) => {
          //   e.preventDefault()
          //
          //   // filterData()
          // }}
          className={styled.filterButton}
        >
          送出
        </button>
      </form>
    </div>
  )
  useEffect(() => {}, [])
  return (
    <>
      {mobile || webFilter}
      {mobile && mobFilter}
    </>
  )
}
