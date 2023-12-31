import React from 'react'
import './styles/Inspector.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import GraphInfo from './GraphInfo'
import PackageInfo from './PackageInfo'

function Tab({ active, children, ...props }) {
  return (
    <div className={`tab ${active ? 'active' : ''}`} {...props}>
      {children}
    </div>
  )
}

export default function Inspector({ className, totalDependencies, hasCircularDep, rootChildren }) {
  const [pane, setPane] = useState('graph')

  let paneComponent
  switch (pane) {
    case 'package':
      paneComponent = <PackageInfo />
      break
    case 'graph':
      paneComponent = <GraphInfo
        totalDependencies={totalDependencies}
        hasCircularDep={hasCircularDep}
        rootChildren={rootChildren}
      />
      break
  }

  return (
    <div id="inspector" className={className}>
      <div id="tabs">
        <Tab data-testid={"tab-graph"} active={pane === 'graph'} onClick={() => setPane('graph')}>
          Graph Info
        </Tab>
        <Tab data-testid={"tab-package"} active={pane === 'package'} onClick={() => setPane('package')}>
          Package Info
        </Tab>
      </div>

      {paneComponent}
    </div>
  )
}

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.string
}
