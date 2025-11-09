'use client';

import { signOut } from "next-auth/react";
import { useResumes } from "./_api/queries";

export default function ResumesPage() {

  const { data: resumes } = useResumes();

  console.log(resumes);
  return (
    <div>
      <div>Resumes</div>
      <button type="button" onClick={() => signOut({
        callbackUrl: "/login",
      })}>Sign Out</button>
      {resumes?.map((resume) => (
        <div key={resume.id}>{resume.title}</div>
      ))}
    </div>
  );
}