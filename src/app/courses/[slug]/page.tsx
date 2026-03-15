import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, FileText, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CheckoutButton } from "@/components/CheckoutButton";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  // In a real app, fetch course data by params.slug using Prisma
  
  return (
    <div className="min-h-screen bg-background">
      {/* Course Hero Header */}
      <div className="bg-card border-b border-border py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0C30 0 15 15 15 30H45C45 15 30 0 30 0z\' fill=\'%235C3D1E\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '120px' }} />
             
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-semibold tracking-wider">
              BAMS 1st Year
            </span>
            <h1 className="text-3xl md:text-5xl font-heading text-foreground">Padartha Vijnana evam Ayurveda Itihas</h1>
            <p className="text-lg text-muted-foreground">
              Master the foundational principles, epistemology, and history of Ayurveda in comprehensive detail.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-foreground/80 pt-2">
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-primary"/> 45 Hours</span>
              <span className="flex items-center"><PlayCircle className="w-4 h-4 mr-1 text-primary"/> 120 Lectures</span>
              <span className="flex items-center"><FileText className="w-4 h-4 mr-1 text-primary"/> 20 Notes PDFs</span>
            </div>
          </div>
          
          <div className="lg:col-span-1">
             <Card className="bg-background shadow-xl overflow-hidden border-2 border-primary/20 relative">
                <VideoPlayer 
                   src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" 
                   title="Padartha Vijnana Sample" 
                   watermarkText="STUDENT-ID-1984" 
                />
                <CardContent className="p-6 space-y-4">
                  <div className="text-3xl font-bold text-foreground">₹2,999</div>
                  <CheckoutButton courseId="padartha-vijnana-1" price={2999} />
                  <p className="text-xs text-center text-muted-foreground uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3"/> Full Lifetime Access
                  </p>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Tabs defaultValue="curriculum" className="w-full lg:w-2/3">
          <TabsList className="bg-card w-full lg:w-auto h-auto p-1 border border-border sticky top-4 z-20 shadow-sm">
            <TabsTrigger value="overview" className="text-base px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="curriculum" className="text-base px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor" className="text-base px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Instructor</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-heading text-foreground">Course Description</h2>
            <p>
              Padartha Vijnana forms the bedrock of Ayurvedic philosophy. This course decodes the complex sutras into simple, understandable clinical correlations. 
            </p>
            <h3 className="text-xl font-heading text-foreground pt-4">What you will learn</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Ayurveda Nirupana", 
                "Dravya Vijnaniyam", 
                "Guna Vijnaniyam", 
                "Karma Vijnaniyam"
              ].map(item => (
                <li key={item} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-secondary"/> <span className="text-foreground/80">{item}</span></li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-8">
            <h2 className="text-2xl font-heading text-foreground mb-6">Course Curriculum</h2>
            <Accordion className="w-full bg-card border border-border rounded-lg overflow-hidden">
              <AccordionItem value="item-1" className="border-border">
                <AccordionTrigger className="px-6 py-4 hover:bg-primary/5 font-semibold text-foreground text-lg">
                  Module 1: Ayurveda Nirupana (Introduction)
                </AccordionTrigger>
                <AccordionContent className="bg-background pt-2 pb-4 px-6 space-y-2 border-t border-border">
                   <LessonItem title="1.1 Lakshana and Ayu" duration="45:00" type="video" />
                   <LessonItem title="1.2 Ashtanga Ayurveda Outline" duration="38:20" type="video" />
                   <LessonItem title="Module 1 Notes PDF" duration="12 Pages" type="doc" />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border">
                <AccordionTrigger className="px-6 py-4 hover:bg-primary/5 font-semibold text-foreground text-lg">
                  Module 2: Dravya Vijnaniyam
                </AccordionTrigger>
                <AccordionContent className="bg-background pt-2 pb-4 px-6 space-y-2 border-t border-border">
                   <LessonItem title="2.1 Panchamahabhuta Theory" duration="52:10" type="video" locked/>
                   <LessonItem title="2.2 Kala and Dik concepts" duration="41:05" type="video" locked/>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="instructor" className="mt-8">
             <div className="flex items-start gap-6 bg-card p-6 rounded-lg border border-border">
               <div className="w-24 h-24 rounded-full bg-muted overflow-hidden shrink-0 border-4 border-secondary/20">
                 <Image src="https://images.unsplash.com/photo-1559839734-[YOUR-INSTRUCTOR]-ID?auto=format&fit=crop&q=80" alt="Dr. Sushruta" width={96} height={96} className="object-cover" />
               </div>
               <div>
                 <h3 className="text-xl font-bold font-heading text-foreground">Dr. Sushruta Sharma</h3>
                 <p className="text-primary font-medium mb-3">MD (Ayurveda), 15+ Years Experience</p>
                 <p className="text-muted-foreground">Expert in basic principles with a passion for decoding ancient samshitas for the modern medical student.</p>
               </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LessonItem({ title, duration, type, locked = false }: { title: string, duration: string, type: 'video' | 'doc', locked?: boolean }) {
  return (
      <div className="flex items-center justify-between p-3 rounded hover:bg-primary/5 transition-colors group cursor-pointer border border-transparent hover:border-primary/10">
        <div className="flex items-center gap-3">
          {type === 'video' ? <PlayCircle className="w-5 h-5 text-secondary" /> : <FileText className="w-5 h-5 text-accent" />}
          <span className={`text-sm font-medium ${locked ? 'text-muted-foreground' : 'text-foreground'}`}>{title}</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-xs text-muted-foreground">{duration}</span>
           {locked && <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Locked</span>}
        </div>
      </div>
  )
}
