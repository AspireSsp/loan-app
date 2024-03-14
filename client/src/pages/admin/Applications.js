import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import PendingList from '../../component/PendingList'
import ApprovedList from '../../component/ApprovedList'
const Applications = () => {
  return (
    <div>
        <Tabs m={4} variant='unstyled'>
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Pending Request</Tab>
                <Tab _selected={{ color: 'white', bg: 'green.400' }}>Approved Request</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <PendingList />
                </TabPanel>
                <TabPanel>
                    <ApprovedList />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
  )
}

export default Applications