import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import MemberContext from '../../../contexts/MemberContext'

export default function ModalView({
  getPostList,
  setIsView,
  showData,
  setCurrentPost,
  currentPost,
  listLength,
}) {
  // console.log(showData.member_sid)

  const { data } = useContext(MemberContext)

  const [user, setUser] = useState({
    avatar: '',
    nickname: '',
    total_height: 0,
  })

  const [liked, setLiked] = useState(false)

  async function getInfo() {
    const rows = await axios.get(
      `http://localhost:3001/member/modal/api?mid=${showData.member_sid}`
    )
    console.log(rows.data)
    setUser(rows.data[0])
  }

  async function getLike() {
    const mid = data.member_sid || ''

    const rows = await axios.get(
      `http://localhost:3001/member/like/api?mid=${mid}&pid=${showData.post_sid}`
    )
    console.log(rows.data[0])
    if (rows.data[0]) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }

  async function addLike() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return alert('請先登入會員')
    }

    const result = await axios.post(
      `http://localhost:3001/member/like/api`,
      { mid: data.member_sid, pid: showData.post_sid },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    getPostList()
    setLiked(true)

    console.log(result.data)
  }

  useEffect(() => {
    getInfo()
  }, [currentPost])

  useEffect(() => {
    getLike()
  }, [currentPost])

  return (
    <>
      <div
        className={styled.modalBg}
        // z-index over nav bar?
        onClick={() => {
          setIsView(false)
        }}
      >
        <div
          className={styled.modal}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={styled.editImg}>
            <img
              src={`http://localhost:3001/uploads/${showData.image_url}`}
              alt="postImg"
            ></img>
          </div>
          <div className={styled.editContent}>
            <div className={styled.contentTop}>
              <div className={styled.contentFlex}>
                <div className={styled.avatar}>
                  <img
                    src={
                      user.avatar
                        ? `http://localhost:3001/uploads/avatar_${user.avatar}`
                        : ''
                    }
                    alt="postImg"
                  ></img>
                </div>
                <h4>{user.nickname}</h4>
                {liked ? (
                  <span>
                    {showData.likes} <i className="fa-solid fa-heart"></i>
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      addLike()
                    }}
                  >
                    {showData.likes} <i className="fa-regular fa-heart"></i>
                  </span>
                )}
              </div>
              <TextareaAutosize
                maxRows="3"
                className={styled.contentTxt}
                readOnly
                value={showData.context}
                style={{ overflow: 'auto' }}
              />
              <div className={styled.contentFlex}>
                <p style={{ marginLeft: '72px' }}>
                  {dayjs(showData.created_at).format('YYYY-MM-DD')}
                </p>
                <p>{showData.name}</p>
                <p>
                  {showData.mountain_name} {showData.height}m
                </p>
              </div>
              <hr />
              <div className={styled.reply}>
                {/* <div className={styled.contentFlex}>
                    <div className={styled.replyAvatar}>
                      <img
                        src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                        alt="postImg"
                      ></img>
                    </div>
                    <div>
                      <h4>勞淑</h4>
                      <TextareaAutosize
                        readOnly
                        value="喜愛登山與旅遊結合規劃，發掘台灣的歷史與美，熱愛攝影，探索台灣百岳，中級山，郊山的山野旅行者。GoHiking ! ! !"
                      />
                    </div>
                    <i className="fa-regular fa-heart"></i>
                  </div> */}
                {Array(10)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <div key={i} className={styled.replyPost}>
                        <div className={`${styled.contentFlex} ${styled.left}`}>
                          <div className={styled.replyAvatar}>
                            <img
                              src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                              alt="postImg"
                            ></img>
                          </div>
                          <div>
                            <h4>勞淑</h4>
                            <TextareaAutosize
                              readOnly
                              value="喜愛登山與旅遊結合規劃，發掘台灣的歷史與美!"
                            />
                          </div>
                          {/* <i className="fa-regular fa-heart"></i> */}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            <hr />
            <div className={styled.contentFlex}>
              <span>
                <TextareaAutosize
                  className={styled.replyInput}
                  maxRows="1"
                  maxLength="120"
                  placeholder="留言...(30字以內)"
                />
              </span>
              <button className={styled.replySend}>送出</button>
            </div>
          </div>
          <div
            className={`${styled.goTo} ${styled.prev}`}
            onClick={() => {
              if (currentPost > 0) {
                setCurrentPost(currentPost - 1)
              }
            }}
          >
            <i
              className="fa-solid fa-chevron-left"
              style={
                currentPost === 0 ? { display: 'none' } : { display: 'block' }
              }
            ></i>
          </div>
          <div
            className={`${styled.goTo} ${styled.next}`}
            onClick={() => {
              if (currentPost < listLength - 1) {
                setCurrentPost(currentPost + 1)
              }
              // if(currentPost === listLength -1) {
              //   setCurrentPost(0)
              // }
            }}
          >
            <i
              className="fa-solid fa-chevron-right"
              style={
                currentPost === listLength - 1
                  ? { display: 'none' }
                  : { display: 'block' }
              }
            ></i>
          </div>
        </div>
      </div>
    </>
  )
}
