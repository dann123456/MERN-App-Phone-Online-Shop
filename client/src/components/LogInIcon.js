import { React } from '@nextui-org/react';


export const LogInIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8125 12.0218H3.77148" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.8848 9.1058L15.8128 12.0218L12.8848 14.9378" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.50439 7.389V6.456C8.50439 4.421 10.1534 2.772 12.1894 2.772H17.0734C19.1034 2.772 20.7484 4.417 20.7484 6.447V17.587C20.7484 19.622 19.0984 21.272 17.0634 21.272H12.1784C10.1494 21.272 8.50439 19.626 8.50439 17.597V16.655" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>



  );
}