import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, BookOpen, Clock, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Opt out of static rendering

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      subject: true,
      bamsYear: true,
      slug: true,
      thumbnail: true,
      instructor: {
        select: {
          name: true
        }
      }
    }
  });
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Banner */}
      <div className="bg-card border-b border-border py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0C30 0 15 15 15 30H45C45 15 30 0 30 0z\' fill=\'%235C3D1E\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '120px' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading text-secondary mb-4">Ayurvedic Library</h1>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Browse our collection of expertly crafted courses designed specifically for BAMS students.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-heading text-foreground mb-3 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" /> Filters
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input placeholder="Search courses..." className="pl-9 bg-card border-border" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">BAMS Year</label>
                <Select>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="1">1st Year Professional</SelectItem>
                    <SelectItem value="2">2nd Year Professional</SelectItem>
                    <SelectItem value="3">3rd Year Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/courses/${course.slug}`} key={course.id} className="group cursor-pointer">
              <Card className="h-full bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors z-10" />
                  <Image 
                    src={course.thumbnail || "https://images.unsplash.com/photo-1542840410-3092f99611a3?auto=format&fit=crop&q=80"} 
                    alt={course.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-background/90 text-primary rounded-full shadow-sm backdrop-blur-md">
                      Year {course.bamsYear}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">{course.subject}</p>
                  <h3 className="text-xl font-heading text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center text-sm text-foreground/80">
                      <BookOpen className="w-4 h-4 mr-2 text-primary" />
                      {course.instructor?.name || "Dr. Ayurveda"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
