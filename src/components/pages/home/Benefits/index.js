import React from 'react'
import {
  Button,
  ResponsiveStack,
  Image,
  Column,
  TextWithIcon,
  Box,
  P,
  Row,
  Text
} from 'serverless-design-system'
import styled from 'styled-components'
import { InternalLink } from 'src/fragments'
import { AppContainerNewest as AppContainer } from 'src/components'
import buildApi from 'src/assets/images/home-benefits-build-api.svg'
import customAutomation from 'src/assets/images/home-benefits-custom-automation.svg'
import dataProcessing from 'src/assets/images/home-benefits-data-processing.svg'
import dotGrid from 'src/assets/images/dot-grid-new.svg'
import DesktopDownArrow from './DesktopDownArrow'
import { Heading, Button as ButtonCTA } from 'src/fragments/DesignSystem'

const MobileBenefitItem = ({number, title}) => (
    <Box display={['block', 'block', 'none']} mt={15} mb={25}>
    <Row>
        <Button bg='#fd5750' width={['60px', '60px', '72px']} height={['60px', '60px', '72px']} fontSize={['26.7px', '26.7px', '32px']} p={0}>
        {number}
        </Button>

        <P color='black' fontSize='24px' ml={'32px'} mt={15}>{title}</P> 
    </Row>  
    </Box>
)

const MobileBenefitItemTablet = ({number, title, width}) => (
    <Box display={['none', 'none', 'block', 'block', 'none']}>
        <Row>
            <Button bg='#fd5750' width={['60px', '60px', '43.6px', '43.6px', '72px']} height={['60px', '60px', '43.6px', '43.6px', '72px']} fontSize={['26.7px', '26.7px', '26.7px', '26.7px', '32px']} p={0}>
            {number}
            </Button>

            <Box width={width}>
            <Text color='black' fontSize='24px' lineHeight='38px' letterSpacing='-0.38px' ml={'24px'} my={0} fontFamily='Soleil'>{title}</Text> 
            </Box>
        </Row>  
    </Box>
)

const MobileCenteredImage = styled(Image)`
    @media screen and (max-width: 415px) {
        margin: 0 auto
    }
`

const BenefitsContainerAnimationStyles = {
    backgroundColor: 'white',
    top: '-27px',
    height: '147vh',
    width: '100vw',
    zIndex: '2',
    transition: 'background 0.2s ease, padding 0.8s linear'
} 

const BenefitsAnimationStylesDesktop = {
    position: 'fixed',
    backgroundColor: 'white',
    top: '-27px',
    height: '147vh',
    width: '1216px',
    zIndex: '2',
    paddingTop: '82px',
    transition: 'background 0.2s ease, padding-bottom 0.8s linear'
} 

const BenefitsAnimationStylesLaptop = {
    position: 'fixed',
    backgroundColor: 'white',
    top: '-27px',
    height: '147vh',
    width: '76%',
    zIndex: '2',
    paddingTop: '82px',
    transition: 'background 0.2s ease, padding-bottom 0.8s linear'
} 

export default class HomeBenefits extends React.Component {
    constructor() {
        super()
        this.state = { 
            showBuildApi: true, 
            showCustomAutomation: false, 
            showDataProcessing: false,
            isUsingMobile: false,
            benefitsAnimationTriggered: false,
            stopAnimation: false,
            currentScrollMovement: 'down',
            lastScrollY: 0,
            benefitsAnimationStyles: {},
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false)
        const windowGlobal = typeof window !== 'undefined' && window
        if(windowGlobal) {
            if(windowGlobal.innerWidth <= 1024) {
                this.setState({isUsingMobile: true})
            }

            if(windowGlobal.innerWidth >= 1600) {
                this.setState({benefitsAnimationStyles: BenefitsAnimationStylesDesktop})
            } else {
                this.setState({benefitsAnimationStyles: BenefitsAnimationStylesLaptop})
            }
        }
    }
  
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false)
    }
  
    onScroll = () => {
     const currentScrollY = window.scrollY
     const scrollMovement = this.state.stopAnimation || currentScrollY > this.state.lastScrollY ? 'down': 'up'

     this.setState({currentScrollMovement: scrollMovement, lastScrollY: currentScrollY})

     if(currentScrollY > 1662) {
         this.setState({stopAnimation: false, benefitsAnimationTriggered: false})
     }

     if(!this.state.isUsingMobile) {

        if(this.state.currentScrollMovement === 'down' && !this.state.stopAnimation) {
                if(currentScrollY > 1060 && currentScrollY < 1500) {
                    this.setState({benefitsAnimationTriggered: true})
                    if(currentScrollY > 1267 && currentScrollY < 1367) {
                        this.showBenefit('customAutomation')
                      } else if(currentScrollY > 1367 && currentScrollY < 1482) {
                          this.showBenefit('dataProcessing')
                      } else if(currentScrollY > 1482 && currentScrollY < 1847) {
                        window.scroll({top: 1076})
                        this.setState({benefitsAnimationTriggered: false, stopAnimation: true, currentScrollMovement: 'down'})
                        
                      } else if(currentScrollY < 1054) {
                          this.showBenefit('buildApi')
                      }
                }
        }

        if(this.state.currentScrollMovement === 'up') {
            if(window.scrollY > 1267 && window.scrollY < 1367) {
                this.showBenefit('customAutomation')
              } else if(window.scrollY > 1367 && window.scrollY < 1482) {
                  this.showBenefit('dataProcessing')
              } else if(window.scrollY < 1054) {
                this.setState({benefitsAnimationTriggered: false})
                  this.showBenefit('buildApi')
              }
        }
        
     }

    }

    showBenefit = (benefitOption) => {
        this.setState({
            showBuildApi: benefitOption === 'buildApi' ? true : false, 
            showCustomAutomation: benefitOption === 'customAutomation' ? true : false, 
            showDataProcessing: benefitOption === 'dataProcessing' ? true : false
        })
    }

    //TODO: componentize
    render() {
        return (
            <AppContainer>
            <Box style={this.state.benefitsAnimationTriggered ? BenefitsContainerAnimationStyles: {}}>
            <DesktopDownArrow animationTriggered={this.state.benefitsAnimationTriggered ? true: false}/>
            </Box>
            
            <Box display={['none', 'none', 'block', 'block', 'none']} mt='92px'>
                <TextWithIcon iconSrc={dotGrid} iconHeight='38px' iconWidth='98px' iconLeft='-40px' iconTop={['-10px','-10px', '4px']}>
                    <Heading.h3 pt='12px' pb={[4, 4, 0]}>
                        What you can do with <br />serverless applications
                    </Heading.h3>
                </TextWithIcon>
            </Box>

            <ResponsiveStack.spaceBetween flexDirection={['column-reverse', 'column-reverse', 'row-reverse', 'row-reverse', 'row']} mt={[100, 100, 69, 69, 100]} mb={[50, 50, 29, 29, 200]} style={this.state.benefitsAnimationTriggered ? this.state.benefitsAnimationStyles: {}}>

            <MobileBenefitItem number='03' title='Data processing' />
            <MobileCenteredImage src={dataProcessing} style={{display: this.state.isUsingMobile ||  this.state.showDataProcessing ? 'block' : 'none' }} width={[250, 250, 181, 181, 515, 615]} height={[233, 233, 169, 169, 581]}/>

            <MobileBenefitItem number='02' title='Custom automation' />
            <MobileCenteredImage src={customAutomation} style={{display: this.state.isUsingMobile ||  this.state.showCustomAutomation ? 'block' : 'none' }} width={[250, 250, 181, 181, 515, 615]} height={[233, 233, 169, 169, 581]}/>
            
            <MobileBenefitItem number='01' title='Build APIs' />
            <MobileCenteredImage src={buildApi} style={{ display: this.state.isUsingMobile || this.state.showBuildApi ? 'block' : 'none' }} width={[250, 250, 181, 181, 581]} height={[233, 233, 169, 169, 481, 581]}/>
            
            <Box display={['block', 'block', 'none', 'none', 'block']}>
            <Column width={[1, 1, '488px', '488px', '368px', '488px']}>
                <TextWithIcon iconSrc={dotGrid} iconHeight='38px' iconWidth='98px' iconLeft='-40px' iconTop={['-10px','-10px', '4px']}>
                    <Heading.h3 pt='12px' pb={[4, 4, 0]}>
                        What you can do with <br />serverless applications
                    </Heading.h3>
                </TextWithIcon>

                <Box display={['none', 'none', 'none', 'none', 'block']}>
                <Row onClick={() => this.showBenefit('buildApi')} mt={[0,0,40]}>
                        <Button bg={this.state.showBuildApi ? '#fd5750': '#eaeaea'} width={['60px', '60px', '72px']} height={['60px', '60px', '72px']} fontSize='32px'>
                        01
                        </Button>
                                <P color='black' fontSize='24px' ml={[0, 0, '32px']} lineHeight='32px' letterSpacing='-0.4px'>Build APIs</P> 
                </Row>  

                <Row onClick={() => this.showBenefit('customAutomation')} mt={[0,0,25]}>
                    <Button bg={this.state.showCustomAutomation ? '#fd5750': '#eaeaea'} width={['60px', '60px', '72px']} height={['60px', '60px', '72px']} fontSize='32px'>
                    02
                    </Button>
                    <P color='black' fontSize='24px' ml={[0, 0, '32px']} lineHeight='32px' letterSpacing='-0.4px'>Custom automation</P> 
                </Row>  

                <Row onClick={() => this.showBenefit('dataProcessing')} mt={[0,0,25]}>
                    <Button bg={this.state.showDataProcessing ? '#fd5750': '#eaeaea'} width={['60px', '60px', '72px']} height={['60px', '60px', '72px']} fontSize='32px'>
                    03
                    </Button>
                    <P color='black' fontSize='24px' ml={[0, 0, '32px']} lineHeight='32px' letterSpacing='-0.4px'>Data processing</P> 
                </Row>  
                <InternalLink to='/framework/docs/getting-started/'>
                <ButtonCTA mt={'50px'}>get started</ButtonCTA>
                </InternalLink>
                </Box>
            </Column>
            </Box>
            
            </ResponsiveStack.spaceBetween>
            <Row display={['none', 'none', 'block', 'block', 'none']} justifyContent='space-between'>
                <MobileBenefitItemTablet number='01' title='Build APIs' width='152px'/>
                <MobileBenefitItemTablet number='02' title='Automation' width='170px'/>
                <MobileBenefitItemTablet number='03' title='Data processing' width='197px' />
            </Row>
        </AppContainer>
        )
    }
}