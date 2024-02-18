import { Data, ErrorBoundary } from '@src/components'
import React, { Suspense } from 'react'
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
    </>
  )
}

export default SuspensePage
