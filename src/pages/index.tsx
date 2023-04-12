import Head from 'next/head'
import Image from 'next/image'
import Ideas from '@/components/ideas'
import { Typography } from '@mui/material'
import styles from '@/styles/Home.module.scss'


export default function Home() {
  return (
    <>
      <Head>
        <title>Tech Screen</title>
        <meta name="description" content="Tech Screen demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Ideas</h1>
        <Ideas />
      </main>
    </>
  )
}
