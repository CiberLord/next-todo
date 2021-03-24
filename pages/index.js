import Head from 'next/head'
import Todo from '../components/Todo'


export default function Home(props){
  return (
    <>
        <Head>
          <title>Todo list</title>
        </Head>
        <section>
          <Todo ids={props.usersId}/>
        </section>
    </>
  )
}