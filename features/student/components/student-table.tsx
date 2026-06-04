import { DataTable } from "@/components/data-table";
import { studentColumns } from "./student-columns";
import useStudents from "../hooks/use-students";
import useScores from "@/features/dashboard/score/hooks/use-scores";
import useMe from "@/features/auth/hooks/use-me";
import useStudent from "../hooks/use-student";

export default function StudentTable() {
  const { data: me } = useMe();
  const { data: studentData } = useStudent(me?.student?.id ?? "");

  console.log(studentData);

  return (
    <div className="">
      <DataTable columns={studentColumns} data={studentData?.scores || []} />
    </div>
  );
}
