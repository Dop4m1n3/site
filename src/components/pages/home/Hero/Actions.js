import React from 'react'
import { Box } from 'serverless-design-system'
import { HeroActionsNew as HeroActions } from 'src/fragments'

const HomeActions = () => (
  <HeroActions
    firstBtn={{
      name: 'install framework',
      to: '/framework/docs/getting-started/',
      completed: true,
    }}
    secondBtn={{
      name: 'demo platform',
      to: '/platform/',
      completed: true,
    }}
    flexDirection={['column', 'column', 'column', 'column', 'row', 'row']}
    justifyContent={['center', 'center', 'left']}
  />
)

export default HomeActions