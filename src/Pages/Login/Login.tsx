import React from 'react'
import s from './Login.module.scss'

const Login : React.FC = () => {
  return (
    <div className={s.root}>
        <div className={s.wrapper}>
            <div className={s.loginForm}>
                <input type="text" />
                <input type="text" />
            </div>
        </div>
    </div>
  )
}

export default Login