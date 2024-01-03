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
          url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D', // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630', // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      description: `description-${product?.title}`,
      url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
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
      images: [
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D',
      ], // Must be an absolute URL
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
