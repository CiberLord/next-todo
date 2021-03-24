import Head from 'next/head'
import Todo from '../components/Todo'


export default function Home(props) {
  return (
    <>
      <Head>
        <title>Todo list</title>
      </Head>
      <section>
        <h1 className="title"><span className="title-1">To</span><span className="title-2">Do</span></h1>
        <Todo ids={props.usersId} />
      </section>
    </>
  )
}