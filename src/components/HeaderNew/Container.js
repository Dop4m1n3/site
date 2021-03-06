import React from 'react'
import { Box, Container } from 'serverless-design-system'

export default ({ children }) => (
 <Container maxWidth={[1216, 1216, 1216, 1216, '76%', 1216]}>
    <Box width={1} px={[15, 15, 15, 15, 0]}>
      { children }
    </Box>
  </Container>
)
