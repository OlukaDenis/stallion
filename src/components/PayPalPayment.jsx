import { Spin } from 'antd';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { PAYPAL_CLIENT_ID, PAYPAL_SOFT_DESCRIPTOR } from '../configs';

export default function PayPalPayment({ orderID, currency, amount, onSuccess, onFailure }) {
  const [paypal, setPaypal] = useState(null);
  const paypalButtonsRef = useRef();

  const isPayPalContainerLoaded = () =>
    typeof window !== 'undefined' && document.getElementById('paypal-payment-buttons');

  useEffect(() => {
    if (isPayPalContainerLoaded()) {
      if (!paypal) setPaypal(window.paypal);
    }
  });

  useEffect(() => {
    if (isPayPalContainerLoaded()) {
      renderPaypalButtons(orderID, currency, amount);
    }
  }, [orderID, currency, amount, paypal]);

  const renderPaypalButtons = (orderID, currency, amount) => {
    
    if (!paypal || paypalButtonsRef.current) return;

    paypalButtonsRef.current = 1;
    paypal
      .Buttons({
        createOrder: function (data, actions) {

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
          console.log('data', data);
          // This function captures the funds from the transaction.
          onSuccess(data.orderID, data.payerID, orderID);
        },
        onCancel: function (data) {
          onFailure('The payment process was canceled by user.');
        },
        onError: function (err) {
          onFailure('An error occurred while processing payment.');
        },
      })
      .render('#paypal-payment-buttons');
  };

  return (
    <>
      
      <Spin tip="Loading..." spinning={!paypal}>
        <div id="paypal-payment-buttons"></div>
      </Spin>
    </>
  );
}
