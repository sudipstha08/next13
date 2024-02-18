import React, { Suspense } from 'react'
import { Data, ErrorBoundary, Users } from '@src/components'
import { ErrorBoundary as ReactErrorBoundry } from 'react-error-boundary'

const SuspensePage = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback="Loading......">
          <Data type="Posts" hasError />
        </Suspense>
      </ErrorBoundary>
      <ReactErrorBoundry fallback={<div>Something went wrong</div>}>
        <Data type="Users" hasError />
      </ReactErrorBoundry>
      <Data type="Comments" />

      <Users />
    </>
  )
}

export default SuspensePage
