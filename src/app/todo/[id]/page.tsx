// 'use client'

import { prisma } from '@src/db'
// import { usePathname, useSearchParams } from 'next/navigation'

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
