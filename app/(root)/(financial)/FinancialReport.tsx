import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FinancialReportCard from '@/components/shared/FinancialReportCard'
import { paymentData, expenseData, investmentData } from '@/data/dummy'
import ProfitLossChart from '@/components/screens/ProfitLossChart'

const FinancialReport = () => {
  const insets = useSafeAreaInsets()
  return (
    <View className="flex-1 bg-white">
      <Header title="Financial Report"/>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}>
        <View className='px-5 py-2'>
          <View className="bg-white rounded-2xl p-4 shadow-2xl gap-4">
            <ProfitLossChart />
            <FinancialReportCard title='Income' data={paymentData}/>
            <FinancialReportCard title='Expenses' data={expenseData}/>
            <FinancialReportCard title='Investments' data={investmentData}/>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FinancialReport