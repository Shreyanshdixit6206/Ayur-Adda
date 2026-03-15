import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, CalendarDays, Award } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading text-foreground">
          Namaste, {session?.user?.name || "Student"}! 🙏
        </h1>
        <p className="text-muted-foreground mt-2">
          Here is your BAMS learning progress overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStats icon={<BookOpen className="text-primary w-6 h-6"/>} title="Enrolled Courses" value="4" />
        <DashboardStats icon={<Clock className="text-secondary w-6 h-6"/>} title="Hours Watched" value="12.5 h" />
        <DashboardStats icon={<CalendarDays className="text-accent w-6 h-6"/>} title="Upcoming Lives" value="2" />
        <DashboardStats icon={<Award className="text-chart-4 w-6 h-6"/>} title="Certificates" value="1" />
      </div>

      <h2 className="text-2xl font-heading text-foreground mt-12 mb-6 border-b border-border pb-2">Continue Learning</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mocking Active Courses */}
        <CourseProgressCard 
            title="Padartha Vijnana evam Ayurveda Itihas"
            module="Module 2: Darshana"
            progress={45}
        />
        <CourseProgressCard 
            title="Rachana Sharir (Anatomy)"
            module="Module 4: Sira, Dhamani"
            progress={82}
        />
      </div>
    </div>
  );
}

function DashboardStats({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-heading text-foreground mt-2">{value}</p>
        </div>
        <div className="p-4 rounded-full bg-background border border-border">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function CourseProgressCard({ title, module, progress }: { title: string, module: string, progress: number }) {
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all cursor-pointer">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground line-clamp-1">{title}</CardTitle>
        <p className="text-sm text-primary font-medium">{module}</p>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
