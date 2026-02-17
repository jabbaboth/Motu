"use client";

import { useState } from "react";
import { Job, JobStatus } from "@/types";
import JobCard from "./JobCard";

interface JobListProps {
  initialJobs: Job[];
  compact?: boolean;
}

export default function JobList({ initialJobs, compact = false }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function handleStatusChange(jobId: string, newStatus: JobStatus) {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: newStatus,
              completionDate:
                newStatus === "Completed"
                  ? new Date().toISOString().split("T")[0]
                  : undefined,
            }
          : j
      )
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-500">No jobs found for these filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 mb-2">
        {jobs.length} job{jobs.length !== 1 ? "s" : ""}
        {" — "}
        {jobs.filter((j) => j.status === "Completed").length} completed,{" "}
        {jobs.filter((j) => j.status === "In Progress").length} in progress,{" "}
        {jobs.filter((j) => j.status === "Pending").length} pending
      </p>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onStatusChange={handleStatusChange}
          compact={compact}
        />
      ))}
    </div>
  );
}
