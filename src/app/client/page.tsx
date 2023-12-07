import Counter from './counter'

function MyServerComponent() {
  return <p className="text-gray-700">This component was rendered on server</p>
}

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">My Page</h1>
      <Counter>
        <MyServerComponent />
      </Counter>
    </section>
  )
}
