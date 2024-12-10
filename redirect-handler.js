import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Users} from "@/utils/schema";
import { db } from "@/utils/db";

export default function RedirectHandler() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      // Save user data to your backend
      const saveUserData = async () => {
        try {
            await db.insert(Users).values({
                    email : user?.primaryEmailAddress?.emailAddress, // Use the email from session metadata
                    plan: 'plan_free', // Save the plan
                    mockUsed: 0, // Start with 0 mocks used
                    mockLimit: 3, // Set mock limit based on the plan
                    createdAt: new Date().toISOString(),
                    endDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // Set created date if this is a new user
                    paymentStatus:"Null",
              }).onConflictDoNothing(); // Avoid duplicate entries

          // Redirect to the desired page
          router.push('/dashboard'); // Change to your target route
        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      };

      saveUserData();
    }
  }, [isSignedIn, user, router]);

  return <p>Redirecting...</p>;
}
