import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { redirect } from "next/dist/server/api-utils";
import { useUser } from '@clerk/nextjs';


export default  async function SyncUser() {

    const { user } = useUser();
console.log(user);
    // Define limits based on the plan
    const mockInterviewLimits = {
        plan_free: 3,
        plan_basic: 5,
        plan_pro: null, // Unlimited
    };

    const plan = 'plan';

    // await db
    // .insert(Users)
    // .values({
    // email: user?.primaryEmailAddress?.emailAddress,
    //   plan, // Save the plan
    //   mockUsed: 0, // Start with 0 mocks used
    //   mockLimit: mockInterviewLimits[plan], // Set mock limit based on the plan
    //   createdAt: new Date().toISOString(), // Set created date if this is a new user
    // })
    // .onConflictDoUpdate({
    //   target: [Users.email], // Resolve conflict based on email
    //   set: {
    //     plan, // Update the plan
    //     mockUsed: 0, // Reset the used mock count
    //     mockLimit: mockInterviewLimits[plan], // Update the mock limit
    //   },
    // })
    // .execute();

    return redirect("/dashboard");

  }