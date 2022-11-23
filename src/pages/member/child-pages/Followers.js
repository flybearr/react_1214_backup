import styled from '../../../styles/member-scss/Follow.module.scss'

export default function Followers() {
  return (
    <>
      <div className={styled.row}>
        <div className={styled.col}>
          <div className={styled.card}>
            <div className={styled.flexbox}>
              <h3>粉絲</h3>
              <h3>43人</h3>
            </div>
            <div className={styled.divider}></div>
            <div className={styled.userList}>
              {Array(10)
                .fill(1)
                .map((v, i) => {
                  return (
                    <div className={styled.user} key={i}>
                      <div className={styled.portrait}>
                        <img src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"></img>
                      </div>
                      <h4>和真</h4>
                      <button className={styled.following}>追蹤中</button>
                    </div>
                  )
                })}
              {Array(33)
                .fill(1)
                .map((v, i) => {
                  return (
                    <div className={styled.user} key={i}>
                      <div className={styled.portrait}>
                        <img src="https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg"></img>
                      </div>
                      <h4>和真</h4>
                      <button className={styled.follow}>追蹤</button>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}