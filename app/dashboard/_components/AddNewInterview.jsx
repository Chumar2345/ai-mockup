"use client";
import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview,Users } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { desc, eq } from "drizzle-orm";


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const [InterviewList, setInterviewList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [interviewCount, setInterviewCount] = useState(0);

  useEffect(() => {
     GetUser();
    user && GetInterviewList();
  }, [user]);
  
  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
  
        setInterviewList(result.length);
  };
  const GetUser = async () => {
    const getUser = await db
      .select()
      .from(Users)
      .where(
        eq(Users.email, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(Users.id));
    // return getUser;
    setUserList(getUser[0]);
  };
  const handleAddInterview = () => {
     GetUser();
    if (UserList.mockLimit != 0 || UserList.plan == 'plan_pro') {
      setOpenDialog(true);
    } else {
      alert(`You have already added ${UserList.mockUsed} interviews. You cannot add more.`); 
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      console.log("🚀 ~ file: AddNewInterview.jsx:41 ~ onSubmit ~ responseText:", responseText)
      const jsonMatch = responseText.match(/\[.*?\]/s);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response");
      }
  
      const jsonResponsePart = jsonMatch[0];
      console.log("🚀 ~ file: AddNewInterview.jsx:43 ~ onSubmit ~ jsonResponsePart:", jsonResponsePart);
  
      if (jsonResponsePart) {
        const mockResponse = JSON.parse(jsonResponsePart.trim());
        console.log("🚀 ~ file: AddNewInterview.jsx:45 ~ onSubmit ~ mockResponse:", mockResponse)
        setJsonResponse(mockResponse);
        const jsonString = JSON.stringify(mockResponse);
        const res = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: jsonString,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
          }).returning({ mockId: MockInterview.mockId });

              // Update the user data
            const userRecord = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress)) // Pass both field and value to eq()
            .execute();

            if (userRecord.length > 0) {
                await db
                  .update(Users)
                  .set({
                    mockUsed: userRecord[0].mockUsed + 1,
                    mockLimit: userRecord[0].mockLimit !== null ? userRecord[0].mockLimit - 1 : null,
                  })
                  .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress)) // Same fix here
                  .execute();
            }
          setLoading(false);
          router.push(`dashboard/interview/${res[0]?.mockId}`);
      } else {
        console.error("Error: Unable to extract JSON response");
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  <div
    className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
    onClick={handleAddInterview}
  >
    <h1 className="font-bold text-lg text-center">+ Add New</h1>
  </div>
  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="font-bold text-2xl">
          Tell us more about your job Interviewing
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div>
          <p>
            Add details about your job position/role, job description, and
            years of experience
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mt-7 my-3">
            <label>Job Role/Job Position</label>
            <Input
              placeholder="Ex. Full Stack Developer"
              required
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Job Description/Tech Stack (In short)</label>
            <Textarea
              placeholder="Ex. React, Angular, NodeJs, MySql etc"
              required
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Years of Experience</label>
            <Input
              placeholder="Ex. 5"
              type="number"
              min="1"
              max="70"
              required
              onChange={(e) => setJobExperience(e.target.value)}
            />
          </div>
          <div className="flex gap-5 justify-end">
            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" /> Generating from AI
                </>
              ) : (
                'Start Interview'
              )}
            </Button>
          </div>    
        </form>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</>

  );
}

export default AddNewInterview;
