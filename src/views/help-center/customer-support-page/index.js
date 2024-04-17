// ** React Imports
import MainCard from 'components/cards/MainCard';
import HelpFooter from 'features/help-center/customer-support/components/helpFooter';
import HelpHeader from 'features/help-center/customer-support/components/helpHeader';
import SupportFaq from 'features/help-center/customer-support/components/supportFaq';
import { Fragment, useEffect, useState } from 'react';
import { getAllFaqCategorywithFaq } from 'features/help-center/customer-support/services/customerSupportServices';

const CustomerSupport = () => {
  const [faqCategories, setFaqCategories] = useState([]);

  const getFaqCategories = async () => {
    const result = await getAllFaqCategorywithFaq();
    setFaqCategories(result.data.data);
  };

  useEffect(() => {
    getFaqCategories();
  }, []);

  console.log(faqCategories);
  return (
    <MainCard title="Customer Suppport">
      <Fragment>
        <HelpHeader />
        <SupportFaq faqCategories={faqCategories} />
        <HelpFooter />
      </Fragment>
    </MainCard>
  );
};

export default CustomerSupport;
