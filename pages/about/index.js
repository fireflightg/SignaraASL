import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HandMetal, BookOpen, Users, Brain } from "lucide-react";
import Nav from "@/components/nav";
import FooterASL from "@/components/footerasl";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Learn ASL with Signara</h1>
          <p className="text-xl text-muted-foreground">
            Discover the beauty of American Sign Language through our
            interactive, camera-based learning platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HandMetal className="mr-2 h-6 w-6" />
                Real-time Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              Practice sign language with instant feedback using advanced
              hand-tracking technology.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-6 w-6" />
                Comprehensive Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent>
              From basic signs to complex conversations, our lessons cover all
              aspects of ASL.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-6 w-6" />
                Community-Driven
              </CardTitle>
            </CardHeader>
            <CardContent>
              Connect with fellow learners and native signers to practice and
              improve your skills.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-6 w-6" />
                Adaptive Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              Our AI-powered system adapts to your learning pace and style for
              optimal progress.
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to start your ASL journey?
          </h2>
          <Link
            href="/lessons"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Begin Learning
          </Link>
        </div>
      </div>
      <FooterASL />
    </>
  );
}
