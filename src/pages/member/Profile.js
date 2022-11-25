import styled from '../../styles/member-scss/Member.module.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios'
import MemberContext from '../../contexts/MemberContext'

function Profile(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const usp = new URLSearchParams(location.search)
  const mid = usp.get('id')

  let initInfo = {
    member_sid: mid,
    nickname: '',
    avatar: '',
    intro: '',
  }

  const { data, auth } = useContext(MemberContext)

  console.log('目前登入會員為:' + data.member_sid)

  const [info, setInfo] = useState(initInfo)
  const [follow, setFollow] = useState([])
  const [following, setFollowing] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)

  async function getInfo() {
    const result = await axios.get(
      `http://localhost:3001/member/profile/api?mid=${mid}`
    )

    // console.log(result.data)

    if (result.data.rows) {
      setInfo(result.data.rows[0])
    } else {
      navigate('/')
    }
  }

  async function getFollow() {
    const rows = await axios.get(
      `http://localhost:3001/member/follow/api?mid=${mid}`
    )

    rows.data.map((v, i) => {
      if (v.follow_sid === data.member_sid) {
        setIsFollowing(true)
      }
    })

    setFollow(rows.data)
    // console.log('followed by:' + rows.data.length)
  }

  async function getFollowing() {
    const rows = await axios.get(
      `http://localhost:3001/member/following/api?fid=${mid}`
    )

    setFollowing(rows.data)
    // console.log('following:' + rows.data.length)
  }

  async function addFollow() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return alert('請先登入會員')
    }
    const result = await axios.post(
      `http://localhost:3001/member/follow/api?mid=${mid}`,
      {
        mid: mid,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )

    console.log(result.data.success)
    if (result.data.success) {
      alert('關注成功')
    }
    if (!result.data.success) {
      alert('關注失敗')
    }
  }

  async function unfollow() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return alert('請先登入會員')
    }

    const result = await axios.delete(
      `http://localhost:3001/member/follow/api?mid=${mid}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    console.log(result.data.success)
    if (result.data.success) {
      alert('取消關注成功')
    }
    if (!result.data.success) {
      alert('取消關注失敗')
    }
  }

  useEffect(() => {
    if (!location.search) {
      navigate('/')
    }

    if (`${mid}` === `${data.member_sid}`) {
      navigate('/member')
    }

    getFollow()
    getFollowing()
    getInfo()
  }, [mid, data.member_sid])

  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <aside className={styled.profile}>
            <div
              className={`${styled.avatar} ${styled.social}`}
              onClick={() => {
                navigate(`/profile?id=${mid}`)
              }}
            >
              {info.avatar ? (
                <img
                  src={`http://localhost:3001/uploads/avatar_${info.avatar}`}
                  alt="avatar"
                ></img>
              ) : (
                <img
                  src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"
                  alt="postImg"
                ></img>
              )}
            </div>
            <h3
              className={styled.social}
              onClick={() => {
                navigate(`/profile?id=${mid}`)
              }}
            >
              {info.nickname}
            </h3>
            <p className={styled.highlight}>銀級玩家</p>
            <div className={styled.socials}>
              <div
                className={styled.social}
                onClick={() => {
                  navigate(`/profile/following?id=${mid}`)
                }}
              >
                <p className={styled.highlight}>關注</p>
                <h3>{following.length}</h3>
              </div>
              <div
                className={styled.social}
                onClick={() => {
                  navigate(`/profile/followers?id=${mid}`)
                }}
              >
                <p className={styled.highlight}>粉絲</p>
                <h3>{follow.length}</h3>
              </div>
            </div>
            {isFollowing ? (
              <button
                className={styled.follow}
                onClick={() => {
                  if (!auth) {
                    alert('請先登入會員')
                  } else {
                    unfollow()
                  }
                }}
              >
                已關注
              </button>
            ) : (
              <button
                className={styled.follow}
                onClick={() => {
                  if (!auth) {
                    alert('請先登入會員')
                  } else {
                    addFollow()
                  }
                }}
              >
                <i className="fa-solid fa-user-plus"></i> 關注他
              </button>
            )}

            <pre className={styled.intro}>{info.intro}</pre>
          </aside>
          <article>
            <Outlet />
          </article>
        </div>
      </div>
    </>
  )
}

export default Profile
