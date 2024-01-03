// 'use client'

import { prisma } from '@src/db'
// import { usePathname, useSearchParams } from 'next/navigation'

import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await prisma.todo.findFirst({ where: { id } })

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    openGraph: {
      images: [
        {
          url: 'https://nextjs.org/og.png', // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      title: 'Next.js',
      description: `description-${product?.title}`,
      url: 'https://nextjs.org',
      siteName: 'Next.js 13 check metadata',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product?.title,
      description: `description-${product?.title}`,
      siteId: '1467726470533754880',
      creator: 'test-@nextjs',
      creatorId: '1467726470533754880',
      images: ['https://nextjs.org/og.png'], // Must be an absolute URL
    },
  }
}

async function getTodo(id: string) {
  'use server'

  return prisma.todo.findFirst({ where: { id } })
}

export default async function Page({ params }: { params: { id: string } }) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()

  // console.log('pathname', pathname)
  // console.log('searchParams', searchParams)
  const todo = await getTodo(params.id)
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todo</h1>
      </header>
      <section>
        <div className="flex">
          <label htmlFor="" className="mr-2 bg-red-400">
            ID
          </label>
          <p className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500">
            {todo?.id}
          </p>
        </div>
        <div className="flex">
          <label htmlFor="" className="mr-2 bg-red-400">
            Title
          </label>
          <p className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500">
            {todo?.title}
          </p>
        </div>
        <div className="flex mt-2">
          <label htmlFor="" className="mr-2 bg-red-400">
            Status
          </label>
          <p className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500">
            {todo?.complete ? 'Completed' : 'Pending'}
          </p>
        </div>
      </section>
    </>
  )
}
