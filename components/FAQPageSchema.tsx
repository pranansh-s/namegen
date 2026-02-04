import { FAQPageJsonLd } from 'next-seo';
import { FC } from 'react';

const FAQPageSchema: FC<{ faqQuestion: any[] }> = ({ faqQuestion }) => (
  <>
    <FAQPageJsonLd mainEntity={faqQuestion} />
  </>
);

export default FAQPageSchema;
