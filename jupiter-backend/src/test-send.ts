import { sendEnquiryAlertToMarketing } from './services/mailService';

async function main() {
  console.log('Sending test enquiry alert to marketing@jupitergroups.in...');
  try {
    const res = await sendEnquiryAlertToMarketing({
      name: 'Naveen Kumar',
      email: 'naveenkumar79110@gmail.com',
      phone: '+91 6380209434',
      company: 'Naveen Industries',
      product: 'Paver Block Machines',
      message: 'Testing quotation request from Jupiter web portal.'
    });
    console.log('EMAIL SENT SUCCESSFULLY! Message ID:', res.messageId);
  } catch (err: any) {
    console.error('FAILED TO SEND EMAIL:', err);
  }
}

main();
