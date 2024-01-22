// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
// import CurrentPlanCard from './CurrentPlanCard'
import CurrentPlanCard from './billing/CurrentPlanCard'
import PaymentMethodCard from './billing/PaymentMethodCard'
import BillingAddressCard from './billing/BillingAddressCard'
// import BillingHistoryTable from './billing/BillingHistoryTable'

const TabBilling = (
  // { apiPricingPlanData }
  ) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard
        //  data={apiPricingPlanData}
          />
      </Grid>

      <Grid item xs={12}>
        <PaymentMethodCard />
      </Grid>

      <Grid item xs={12}>
        <BillingAddressCard />
      </Grid>

      <Grid item xs={12}>
        {/* <BillingHistoryTable /> */}
      </Grid>
    </Grid>
  )
}

export default TabBilling
