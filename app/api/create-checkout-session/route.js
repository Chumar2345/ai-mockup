import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { planId, email } = await request.json(); // Add email to the request body
  
  let price = 0;

  // Set price based on planId
  if (planId === 'plan_basic') {
    price = 999; // $9.99 in cents
  } else if (planId === 'plan_pro') {
    price = 1999; // $19.99 in cents
  } else if (planId === 'plan_free') {
    price = 0; // Free plan
  } else {
    return new Response(JSON.stringify({ error: 'Invalid planId' }), { status: 400 });
  }

  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planId,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        email, // Pass the user's email
        plan: planId, // Pass the planId as metadata
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success/`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel/`,
    });

    // Return the session ID in the response
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), { status: 500 });
  }
}
