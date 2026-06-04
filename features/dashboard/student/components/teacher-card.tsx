import { Card, CardContent } from "@/components/ui/card";

type Props = {
  name: string;
  subject: string;
};

export default function TeacherCard({ name, subject }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-row space-x-4 items-center">
          <div className="w-10 aspect-square rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center">
            {name[0]}
          </div>

          <div className="flex flex-col space-y-1">
            <span className="font-bold text-sm">{name}</span>
            <span>Mata Pelajaran: {subject}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
