import Head from 'next/head';
import { useEffect, useState } from 'react';
import { PAYPAL_CLIENT_ID } from '../configs';

export default function PayPalPayment({orderID, currency, amount, onSuccess, onFailure}) {
  const PAYPAL_SOFT_DESCRIPTOR = 'SuperStallio';
  const BASE_URL = 'https://premarsystems.com/medke';
  const PAYPAL_CAPTURE_URL = BASE_URL + '/paypal/capture/';

  const [paypal, setPaypal] = useState(null);

  useEffect(() => {
    if (!paypal) setPaypal(window.paypal);
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('paypal-payment-buttons')) {
      renderPaypalButtons(orderID, currency, amount);
    }
  }, [orderID, currency, amount, paypal]);

  const renderPaypalButtons = (orderID, currency, amount) => {
    
    if(!paypal) return;

    paypal
      .Buttons({
        createOrder: function (data, actions) {
          console.log('CURRENCY: ', currency);
          console.log('AMOUNT: ', amount);

          if (actions === null) return;

          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
                custom_id: orderID, // Used to reconcile API caller-initiated transactions with PayPal transactions.
                // description: "",
                soft_descriptor: PAYPAL_SOFT_DESCRIPTOR,
              },
            ],
          });
        },
        onApprove: function (data, actions) {
            console.log('data',data);
          // This function captures the funds from the transaction.
          onSuccess(data.orderID, data.payerID, orderID);
        },
      })
      .render('#paypal-payment-buttons');
  };

  return (
    <>
      <Head>
        {/* Load the required PayPal checkout.js script */}
        <script src={"https://www.paypal.com/sdk/js?client-id=" + PAYPAL_CLIENT_ID}></script>
      </Head>
      <div id="paypal-payment-buttons"></div>
    </>
  );
}
