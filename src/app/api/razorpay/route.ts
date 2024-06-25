// src/app/api/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: 'rzp_test_QZVTreX3fAEZto',
      key_secret: 'VVONAcfnWWN1LhIonl3R4COX',
    });

    const { amount } = await request.json();

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'order_receipt_11',
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}