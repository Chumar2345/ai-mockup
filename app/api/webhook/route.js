import Stripe from 'stripe';
import { db } from "@/utils/db"; // Your db import
import { Users } from "@/utils/schema"; // Your Users schema import

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const sig = request.headers.get('stripe-signature'); // Get Stripe signature for security
  const body = await request.text(); // Get the raw body of the request

  let event;
console.log("111111");
  // Verify the webhook signature to ensure it's from Stripe
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Webhook error: Signature verification failed', { status: 400 });
  }

  // Log the event to check what we're receiving
  console.log("Received event:", event);

  // Handle the event type
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get email and plan from metadata (use real email here)
    const email = session.metadata.email;
    const plan = session.metadata.plan;
    const status = session.payment_status;

    // Define limits based on the plan
    const mockInterviewLimits = {
      plan_free: 3,
      plan_basic: 5,
      plan_pro: null, // Unlimited
    };

    try {
      // Directly insert or update the user record, ensuring the mock fields are properly updated
      await db
        .insert(Users)
        .values({
          email, // Use the email from session metadata
          plan, // Save the plan
          mockUsed: 0, // Start with 0 mocks used
          mockLimit: mockInterviewLimits[plan], // Set mock limit based on the plan
          createdAt: new Date().toISOString(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // Set created date if this is a new user
          paymentStatus:status,
        })
        .onConflictDoUpdate({
          target: [Users.email], // Resolve conflict based on email
          set: {
            plan, // Update the plan
            mockUsed: 0, // Reset the used mock count
            mockLimit: mockInterviewLimits[plan],
            createdAt: new Date().toISOString(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // Update the mock limit
            paymentStatus:status,
          },
        })
        .execute();

      return new Response('User plan updated or created successfully', { status: 200 });
    } catch (err) {
      console.error('Error updating or creating user plan:', err);
      return new Response('Error updating user plan', { status: 500 });
    }
  }

  // Handle other event types if needed
  return new Response('Event type not handled', { status: 200 });
}
