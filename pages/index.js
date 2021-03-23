import Head from 'next/head'
import Link from 'next/link'
import style  from '../styles/utils.module.css'


export default function Home(props){

  return (
    <div>
        <h1>Nextjs app create</h1>
        <div className={style.linkBlock}>
          <Link href="info">
            <a>info...</a>
          </Link>
          <Link href="contacts">
            <a>contacts</a>
          </Link>
        </div>
    </div>
  )
}
