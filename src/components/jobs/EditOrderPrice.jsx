import { Button, Input, message, Popconfirm, Spin } from 'antd';
import { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function EditOrderPrice({ text, order, isAdmin, isManager, editable = true }) {
  const [isUpdatingPayout, setIsUpdatingPayout] = useState(false);

  const mClickEventRef = useRef();

  const updateOrderPrice = (totalPayout, negotiationFee) => {
    if (!isAdmin && !isManager) {
      return;
    }

    if (
      !totalPayout ||
      !negotiationFee ||
      Number.isNaN(Number(negotiationFee)) ||
      Number(negotiationFee) < 0 ||
      totalPayout - negotiationFee < 0
    ) {
      message.error('Incorrect values! Please edit correctly before committing.');
    } else if (
      Number(totalPayout).toFixed(2) === Number(order.amount).toFixed(2) &&
      Number(negotiationFee).toFixed(2) === Number(order.amount_negotiation_fee).toFixed(2)
    ) {
      message.warn('Zero changes found. No operation performed!');
    } else {
      setIsUpdatingPayout(true);
      firebase
        .firestore()
        .doc(`/orders/${order.order_id}`)
        .set(
          {
            amount: totalPayout,
            amount_negotiation_fee: negotiationFee,
            amount_driver: Number(totalPayout - negotiationFee).toFixed(2),
          },
          { merge: true }
        )
        .then((success) => setIsUpdatingPayout(false))
        .catch((error) => {
          setIsUpdatingPayout(false);
          message.warn('Failed to update! Please try again.');
        });
    }
  };

  const EditPriceUI = ({ updateOrder }) => {
    const [totalPayout, setTotalPayout] = useState(order.amount);
    const [negotiationFee, setNegotiationFee] = useState(order.amount_negotiation_fee);

    mClickEventRef.current = function() {
        updateOrder(totalPayout, negotiationFee);
    };

    return (
      <>
        <h4>{`Edit Payout: Order # ` + order.id}</h4>
        <label>Total Payout Amount $: </label>
        <Input
          key={`${order.order_id}_total_amt`}
          type="number"
          disabled={!editable}
          placeholder="Total Payout Amount"
          value={totalPayout}
          onChange={(e) => {
            setTotalPayout(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Negotiation Fee $: </label>
        <Input
          key={`${order.order_id}_neg_fee`}
          type="number"
          disabled={!editable}
          placeholder="Negotiation Fee"
          value={negotiationFee}
          onChange={(e) => {
            setNegotiationFee(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Driver Payout $: </label>
        <Input
          key={`${order.order_id}_driver_amt`}
          type="number"
          disabled
          //   disabled={order.driver_submitted}
          placeholder="Negotiation Fee"
          value={totalPayout - negotiationFee}
        />
      </>
    );
  };

  return (
    <>
      {isAdmin || isManager ? (
        <>
          {/* {isUpdatingPayout && <Spin />} */}
          <Popconfirm
            placement="left"
            title={<EditPriceUI updateOrder={updateOrderPrice} key={order.order_id} />}
            onConfirm={() => mClickEventRef.current()}
            okText="Update"
            cancelText="Cancel"
          >
            {isUpdatingPayout && <Spin disabled={isUpdatingPayout} />}
            <a disabled={isUpdatingPayout}>${text}</a>
          </Popconfirm>
        </>
      ) : (
        <span>${order.amount_driver}</span>
      )}
    </>
  );
}
